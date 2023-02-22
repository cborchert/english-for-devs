/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Chapters = "chapters",
	Courses = "courses",
	Mastery = "mastery",
	Modules = "modules",
	Progress = "progress",
	Questions = "questions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ChaptersChapterTypeOptions {
	"lesson" = "lesson",
	"exercise" = "exercise",
}
export type ChaptersRecord = {
	published?: boolean
	slug: string
	title?: string
	description?: string
	chapterType?: ChaptersChapterTypeOptions
	content?: string
	questions?: RecordIdString[]
}

export type CoursesRecord = {
	published?: boolean
	slug?: string
	title?: string
	description?: string
	modules?: RecordIdString[]
}

export type MasteryRecord<Tattempts = unknown> = {
	user?: RecordIdString
	question?: RecordIdString
	ease?: number
	interval?: number
	attempts?: null | Tattempts
	nextScheduledAttempt?: IsoDateString
}

export type ModulesRecord = {
	published?: boolean
	title?: string
	subtitle?: string
	description?: string
	chapters?: RecordIdString[]
}

export type ProgressRecord = {
	user?: RecordIdString
	chapter?: RecordIdString
	completedQuestions?: RecordIdString[]
	percentComplete?: number
}

export enum QuestionsQuestionTypeOptions {
	"multipleChoice" = "multipleChoice",
	"freeResponse" = "freeResponse",
	"assistedResponse" = "assistedResponse",
}
export type QuestionsRecord<Tanswers = unknown, Toptions = unknown> = {
	published?: boolean
	title?: string
	question?: string
	questionType: QuestionsQuestionTypeOptions
	options?: null | Toptions
	answers?: null | Tanswers
	responseAudioScript?: string
	responseAudioUrl?: string
	responseAudioUrlTextSource?: string
}

export enum UsersRoleOptions {
	"editor" = "editor",
}
export type UsersRecord = {
	name?: string
	avatar?: string
	role?: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type ChaptersResponse<Texpand = unknown> = ChaptersRecord & BaseSystemFields<Texpand>
export type CoursesResponse<Texpand = unknown> = CoursesRecord & BaseSystemFields<Texpand>
export type MasteryResponse<Tattempts = unknown, Texpand = unknown> = MasteryRecord<Tattempts> & BaseSystemFields<Texpand>
export type ModulesResponse<Texpand = unknown> = ModulesRecord & BaseSystemFields<Texpand>
export type ProgressResponse<Texpand = unknown> = ProgressRecord & BaseSystemFields<Texpand>
export type QuestionsResponse<Tanswers = unknown, Toptions = unknown> = QuestionsRecord<Tanswers, Toptions> & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	chapters: ChaptersRecord
	courses: CoursesRecord
	mastery: MasteryRecord
	modules: ModulesRecord
	progress: ProgressRecord
	questions: QuestionsRecord
	users: UsersRecord
}