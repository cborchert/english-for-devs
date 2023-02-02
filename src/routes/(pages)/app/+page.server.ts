import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// load course and progress data

	// TODO: add course types
	const courses = await locals.pb.collection('courses').getFullList(200, {
		filter: 'slug = "anglais-pour-les-devs"',
		expand: 'modules,modules.chapters'
	});

	// TODO: add progress types
	const progress = await locals.pb.collection('progress').getFullList(200, {
		filter: `user.id = "${locals.pb?.authStore?.model?.id}"`,
		expand: 'chapter'
	});

	const course = courses?.[0] || {};
	const modules = course.expand?.modules;

	const chapterProgress: { [id: string]: number } = progress.reduce((acc: any, item: any) => {
		let progress = 0;
		if (item.expand?.chapter?.chapterType === 'exercise') {
			const numberOfChapterQuestions = item.expand.chapter.questions?.length || 0;
			const numberOfCompletedQuestions = item.completedQuestions?.length || 0;
			progress =
				numberOfChapterQuestions > 0 ? numberOfCompletedQuestions / numberOfChapterQuestions : 0;
		} else {
			progress = item.progress || 0;
		}
		return {
			...acc,
			[item.expand?.chapter?.id]: progress
		};
	}, {});

	const moduleProgress: { [id: string]: number } = modules.reduce((acc: any, module: any) => {
		const numberOfModuleChapters = module.chapters?.length || 0;
		const moduleChapterProgressSum = module.chapters?.reduce(
			(acc: any, chapterId: any) => acc + chapterProgress[chapterId] || 0,
			0
		);
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
		// TODO: add module types
		modules: course.expand?.modules?.map((module: any) => ({
			title: module.title,
			subtitle: module.subtitle,
			// TODO: determine variant 'current' | 'upcoming' | 'completed' | 'locked'
			progress: (moduleProgress[module.id] || 0) * 100,
			// TODO: add chapter types
			chapters: module.expand?.chapters?.map((chapter: any) => {
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
