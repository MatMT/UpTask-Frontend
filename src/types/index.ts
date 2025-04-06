import {z} from 'zod';

/** Auth & Users */
export const authSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
});

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ResetPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPassword = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>;

export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({_id: z.string(),})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name'> & {
    email?: User['email'] | null;
}
/** Note */
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    createdAt: z.string(),
    task: z.string()
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/**
 * Tasks
 */

export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(
        z.object({
            user: userSchema.nullable(),
            status: taskStatusSchema,
        })),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema,
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>;

/** Projects */

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
    manager: z.string(userSchema.pick({_id: true, name: true})),
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

/** Team */

const teamMemberSchema = userSchema.pick(
    {
        _id: true,
        name: true,
        email: true,
    }
);

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
