import type {
	ChaptersResponse,
	CoursesResponse,
	ModulesResponse,
	ProgressResponse
} from '$lib/types/pocketbaseTypes';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// load course and progress data
	const courses: CoursesResponse<{
		modules: ModulesResponse<{ chapters: ChaptersResponse[] }>[];
	}>[] = await locals.pb.collection('courses').getFullList(200, {
		filter: 'slug = "anglais-pour-les-devs"',
		expand: 'modules,modules.chapters'
	});

	const progress: ProgressResponse[] = await locals.pb.collection('progress').getFullList(200, {
		filter: `user.id = "${locals.pb?.authStore?.model?.id}"`,
		expand: 'chapter'
	});

	const course = courses?.[0] || {};
	const modules = course.expand?.modules || [];

	const chapterProgress: { [id: string]: number } = progress.reduce((acc: any, item: any) => {
		let progress = 0;
		if (item.expand?.chapter?.chapterType === 'exercise') {
			const numberOfChapterQuestions = item.expand.chapter.questions?.length || 0;
			const numberOfCompletedQuestions = item.completedQuestions?.length || 0;
			progress =
				numberOfChapterQuestions > 0 ? numberOfCompletedQuestions / numberOfChapterQuestions : 0;
		} else {
			progress = item.percentComplete || 0;
		}
		return {
			...acc,
			[item.expand?.chapter?.id]: progress
		};
	}, {});

	const moduleProgress: { [id: string]: number } = modules.reduce((acc, module) => {
		const numberOfModuleChapters = module.chapters?.length || 0;
		const moduleChapterProgressSum =
			module.chapters?.reduce(
				(chapterAcc, chapterId) => chapterAcc + chapterProgress[chapterId] || 0,
				0
			) || 0;
		const moduleProgress =
			numberOfModuleChapters > 0 ? moduleChapterProgressSum / numberOfModuleChapters : 0;
		return {
			...acc,
			[module.id]: moduleProgress
		};
	}, {});

	// TODO: add expected types
	const sanitizedCourse = {
		title: course.title,
		description: course.description,
		modules: course.expand?.modules?.map((module) => ({
			title: module.title,
			subtitle: module.subtitle,
			// TODO: determine variant 'current' | 'upcoming' | 'completed' | 'locked'
			progress: (moduleProgress[module.id] || 0) * 100,
			chapters: module.expand?.chapters?.map((chapter) => {
				const pageTyoe = chapter.chapterType === 'exercise' ? 'exercise' : 'lesson';
				const href = `/app/${pageTyoe}/${chapter.slug}`;
				return {
					title: chapter.title,
					description: chapter.description,
					type: chapter.chapterType,
					progress: (chapterProgress[chapter.id] || 0) * 100,
					href
				};
			})
		}))
	};

	return {
		course: sanitizedCourse
	};
}) satisfies PageServerLoad;
