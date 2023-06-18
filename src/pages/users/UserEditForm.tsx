import axiosInstance from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Card } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from 'zod'
import { useEffect, useState } from "react";
import useSwr from 'swr';
import fetcher from "@/utils/fetcher";
import { ListUserModel, ZodResponseError } from "@/types/app";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import formStyles from '@/assets/styles/form.module.scss'

const FormSchema = z.object({
    name: z.string().min(4, { message: 'Name must be at least 4 chars long'}),
    password: z.string().min(6, 'Password too short - should be 6 chars minimum!'),
    confirmPassword: z.string(),
    email: z.string().min(1, { message: 'Email cannot be empty'}).email({ message: 'Invalid email'}),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must be the same',
    path: ['confirmPassword'],
})

type FormSchemaType = z.infer<typeof FormSchema>

const UserForm = () => {
    const { id } = useParams<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema)
    })

    const { data, mutate } = useSwr<ListUserModel | null>(`users/${id}`, fetcher);

    useEffect(() => {
        if(data)
           reset(data)
    }, [data, reset])

    const editUser = async (formData: FormSchemaType) => {
        try {
            setIsLoading(true)
            await axiosInstance.put(`users/${id}`, formData)
            toast.success('Successfully updated user data')
            mutate();
        }
        catch(ex){
            const errData = (ex as AxiosError).response?.data as Array<ZodResponseError>;
            if(errData[0].message){
                setError(errData[0].message)
            }
        }
        finally {
            setIsLoading(false);
            setError(null);
        }
    }

    const onSubmit:SubmitHandler<FormSchemaType> = (formData) => {
        editUser(formData);
    }
    
    return (
        <section>
            <Card>
                <h2 className={formStyles.formTitle}>Edit user</h2>
                { error !== null && <Alert severity="error" style={{ marginBottom: '20px'}}>{error}</Alert> }
                <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                    <div className="form-group form-group-input">
                        <label htmlFor="name">Name
                            <input  
                                type="text"
                                placeholder="Your user name"
                                {...register('name')} 
                            />
                        </label>
                        { errors.name && <span className="form-error">{ errors.name.message }</span>}
                    </div>
                    <div className="form-group form-group-input">
                        <label htmlFor="email">Email
                            <input  
                                type="email"
                                placeholder="Your email"
                                {...register('email')} 
                            />
                        </label>
                        { errors.email && <span className="form-error">{ errors.email.message }</span>}
                    </div>
                    <div className="form-group form-group-input">
                        <label htmlFor="email">Password
                            <input  
                                type="password" 
                                placeholder="Your password"
                                {...register('password')} 
                            />
                        </label>
                        { errors.password && <span className="form-error">{ errors.password.message }</span>}
                    </div>
                    <div className="form-group form-group-input">
                        <label htmlFor="email">Confirm password
                            <input  
                                type="password" 
                                placeholder="Confirm your password"
                                {...register('confirmPassword')} 
                            />
                        </label>
                        { errors.confirmPassword && <span className="form-error">{ errors.confirmPassword.message }</span>}
                    </div>
                    <button type="submit" className="clean btn variant primary form-button" disabled={isLoading}>Submit</button>
                </form>
            </Card>
        </section>
    )
}

export default UserForm;