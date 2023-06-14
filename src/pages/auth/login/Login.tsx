import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bg_image from '@/assets/images/background_image.jpg'
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { AuthCredentialsModel, UserModel } from "@/types/app";
import useSwr from 'swr';
import fetcher from "@/utils/fetcher";
import loginStyleModule from './login.module.scss'

const createSessionSchema = object({
  email: string().nonempty({
    message: "Email is required",
  }).email(),
  password: string().nonempty({
    message: "Password is required",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const LoginPage = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext);
    const { data, error } = useSwr<UserModel | null>('users/current', fetcher, {
        errorRetryCount: 3
    })
    useEffect(() => {
        if(data && !error)
        {
            setIsAuthenticated(true);
            navigate('/')
        }
    }, [data, setIsAuthenticated, navigate, error])
    const [loginError, setLoginError] = useState<string | null>(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema),
    });

    async function onSubmit(values: CreateSessionInput) {
        try {
           await axios.post<AuthCredentialsModel>(
            '/sessions/login/admin',
            values,
            { withCredentials: true }
          );
          setIsAuthenticated(true);
          navigate('/');
        } catch (e) {
            const ex = e as unknown as AxiosError;
            setLoginError(ex.response?.data as string || null);
        }
    }

    return (
        <div className={loginStyleModule.loginPage}>
            <img src={bg_image} alt="dark screen with pencil" className={loginStyleModule.bgImage} />
            <form onSubmit={handleSubmit(onSubmit)} className={`${loginStyleModule.loginForm} widget`}>
                <h3>Log In into your favourite admin panel</h3>
                { loginError !== null && <Alert severity="error" style={{ marginBottom: '20px'}}>{loginError}</Alert> }
                <div className="form-element">
                    <label htmlFor="email">Email
                        <input
                            id="email"
                            type="email"
                            className={`form-input ${errors.email?.message ? 'invalid' : ''}`}
                            placeholder="jane.doe@example.com"
                            {...register("email")}
                        />
                    </label>
                    <p className="form-error">{errors.email?.message}</p>
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password
                        <input
                            id="password"
                            type="password"
                            placeholder="*********"
                            className={`form-input ${errors.password?.message ? 'invalid' : ''}`}
                            {...register("password")}
                        />
                    </label>
                    <p className="form-error">{errors.password?.message}</p>
                </div>
                <Button variant="contained" type="submit" style={{ backgroundColor: 'var(--primary-button)' }}>SUBMIT</Button>
            </form>
        </div>
    );
}

export default LoginPage;