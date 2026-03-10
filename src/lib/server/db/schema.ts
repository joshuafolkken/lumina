import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const task = sqliteTable('task', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1),
})

export const schema = { task }
