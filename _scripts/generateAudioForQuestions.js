/**
 * This script generates audio for the next questions
 * It uses Google Cloud Text-to-Speech API to generate the audio
 * and then uploads it to an AWS S3 bucket
 * then it updates the question records with the audio URL
 */
import AWS from 'aws-sdk';
import textToSpeech from '@google-cloud/text-to-speech';
import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

const VOICE_CONFIG = { languageCode: 'en-US', name: 'en-US-Neural2-J' };
const S3_BUCKET = 'english-for-devs';

// requires google cloud credentials to be set up
// see https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev
const ttsClient = new textToSpeech.TextToSpeechClient();
// requires AWS credentials to be set up in .env
const s3Client = new AWS.S3({
	accessKeyId: env.VITE_AWS_ACCESS_KEY_ID,
	secretAccessKey: env.VITE_AWS_SECRET_ACCESS_KEY,
	region: 'eu-west-3'
});
// requires PocketBase credentials to be set up in .env and the pocketbase server to be running
const pb = new PocketBase(env.VITE_POCKETBASE_URL);
await pb.admins.authWithPassword(
	env.VITE_POCKETBASE_ADMIN_EMAIL,
	env.VITE_POCKETBASE_ADMIN_PASSWORD
);

const questions = await pb.collection('questions').getFullList(200);

console.log('Creating audio for questions');
const updatePromises = questions.map(async (question, i) => {
	const { responseAudioScript, answers, id, responseAudioUrl, responseAudioUrlTextSource } =
		question;
	const scriptToUse = responseAudioScript || answers?.[0] || '';

	// skip if there is no script to use or if the script is the same as the one already used to generate the audio
	if (!scriptToUse || (responseAudioUrl && responseAudioUrlTextSource === scriptToUse)) {
		console.log(
			`Skipping question ${id}:`,
			!scriptToUse
				? `no script`
				: `script is the same as the one already used to generate the audio`
		);
		return Promise.resolve();
	}

	// synthesize the audio
	console.log(`Generating audio for question ${id}`);
	const [ttsResponse] = await ttsClient.synthesizeSpeech({
		input: { text: scriptToUse },
		voice: VOICE_CONFIG,
		audioConfig: { audioEncoding: 'MP3' }
	});
	// Write the binary audio content to the s3 bucket
	console.log(`Uploading audio for question ${id}`);
	const s3Response = await s3Client
		.putObject({
			Bucket: S3_BUCKET,
			Key: `${id}.mp3`,
			Body: ttsResponse.audioContent
		})
		.promise();
	// update the question record with the audio URL
	console.log(`Updating record for  ${id}`);
	return pb.collection('questions').update(id, {
		responseAudioUrl: `https://${S3_BUCKET}.s3.amazonaws.com/${id}.mp3`,
		responseAudioUrlTextSource: scriptToUse
	});
});

await Promise.all(updatePromises);

// logout
pb.authStore.clear();
