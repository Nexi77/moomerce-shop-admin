import axiosInstance from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Autocomplete, Card, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from 'zod'
import { SyntheticEvent, useEffect, useState } from "react";
import { ColorEnum, ProductListModel, SizeEnum, ZodResponseError } from "@/types/app";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import formStyles from '@/assets/styles/form.module.scss'
import useSwr from 'swr';
import { CategoryOptions, ColorOptions, SizeOptions } from "@/utils/selectOptions";
import fetcher from "@/utils/fetcher";

const FormSchema = z.object({
    title: z.string().min(6, 'Title must be at least 6 chars long'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 chars long'),
    img: z.string({
        required_error: 'image is required to add product',
    }).url({ message: 'It is not valid url'}),
    categories: z
        .array(z.string())
        .min(1, 'You must set at least 1 category for product'),
    color: z
    .string()
    .refine(color => Object.keys(ColorEnum).includes(color.toUpperCase()), {
        message: `Color must be set as one of ${Object.values(ColorEnum).join(
        ','
        )}`,
    }),
    price: z.union([z.string().min(1, 'Price is required'), z.number()])
    .refine(price => Number(price) > 0, {
        message: 'Price must be greater than 0'
    }),
    size: z.string().refine(size => Object.keys(SizeEnum).includes(size), {
        message: `Size must be set as one of ${Object.values(SizeEnum).join(
          ','
        )}`,
    }),
})

type FormSchemaType = z.infer<typeof FormSchema>

const EditProductForm = () => {
    const { id } = useParams<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema)
    })

    const { data, mutate } = useSwr<ProductListModel | null>(`products/${id}`, fetcher);

    useEffect(() => {
        if(data)
           reset(data)
    }, [data, reset])

    const updateProduct = async (formData: FormSchemaType) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.put<ProductListModel>(`products/${id}`, formData)
            toast.success('Successfully created user data')
            mutate(res.data);
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

    const handleCategoriesChange = (_: SyntheticEvent<Element, Event>, value: string[]) => {
        setValue('categories', value);
        trigger("categories")
    }
    const handleColorChange = (_: SyntheticEvent<Element, Event>, value: string | null) => {
        if(value !== null)
            setValue('color', value);
    }
    const handleSizeChange = (_: SyntheticEvent<Element, Event>, value: string | null) => {
        if(value !== null)
            setValue('size', value);
    }

    const onSubmit:SubmitHandler<FormSchemaType> = (formData) => {
        const newForm = { ...formData };
        newForm.price = Number(newForm.price);
        updateProduct(newForm);
    }
    
    return (
        <section>
            <Card>
                <h2 className={formStyles.formTitle}>Create product</h2>
                { error !== null && <Alert severity="error" style={{ marginBottom: '20px'}}>{error}</Alert> }
                <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                <div className="form-group form-group-input">
                        <label htmlFor="name">Title
                            <input  
                                type="text"
                                className={errors.title ? 'hasError' : ''}
                                placeholder="Product title"
                                {...register('title')} 
                            />
                        </label>
                        { errors.title && <span className="form-error">{ errors.title.message }</span>}
                    </div>
                    <div className="form-group form-group-input">
                        <label htmlFor="email">Description
                            <textarea  
                                placeholder="Product description..."
                                className={errors.description ? 'hasError' : ''}
                                {...register('description')} 
                            />
                        </label>
                        { errors.description && <span className="form-error">{ errors.description.message }</span>}
                    </div>
                    <div className="form-group form-group-input">
                        <label htmlFor="email">Image
                            <input  
                                type="text" 
                                placeholder="Image link"
                                className={errors.img ? 'hasError' : ''}
                                {...register('img')} 
                            />
                        </label>
                        { errors.img && <span className="form-error">{ errors.img.message }</span>}
                    </div>
                    <div className="form-group form-group-mui">
                        <label htmlFor="categories">Categories</label>
                        <Autocomplete 
                            id="categories"
                            multiple
                            {...register('categories')}
                            options={CategoryOptions().map(opt => opt.label)} 
                            value={getValues().categories || []}
                            onChange={handleCategoriesChange}
                            renderInput={(params) => (
                                <TextField  
                                    {...params}
                                    variant="standard"
                                    error={!!errors.categories}
                                    placeholder="Categories" 
                                />
                            )} />
                        { errors.categories && <span className="form-error">{ errors.categories.message }</span>}
                    </div>
                    <div className="form-group form-group-mui">
                        <label htmlFor="categories">Color</label>
                        <Autocomplete 
                            id="color"
                            {...register('color')}
                            options={ColorOptions().map(opt => opt.label)}
                            value={getValues().color || null} 
                            onChange={handleColorChange}
                            renderInput={(params) => (
                                <TextField  
                                    {...params}
                                    variant="standard"
                                    error={!!errors.color}
                                    placeholder="color" 
                                />
                            )} />
                        { errors.color && <span className="form-error">{ errors.color.message }</span>}
                    </div>
                    <div className="form-group form-group-input">
                        <label htmlFor="email">Price
                            <input  
                                type="number" 
                                placeholder="Price"
                                className={errors.price ? 'hasError' : ''}
                                {...register('price')} 
                            />
                        </label>
                        { errors.price && <span className="form-error">{ errors.price.message }</span>}
                    </div>
                    <div className="form-group form-group-mui">
                        <label htmlFor="categories">Size</label>
                        <Autocomplete 
                            id="size"
                            {...register('size')}
                            options={SizeOptions().map(opt => opt.label)} 
                            value={getValues().size || null} 
                            onChange={handleSizeChange}
                            renderInput={(params) => (
                                <TextField  
                                    {...params}
                                    variant="standard"
                                    error={!!errors.size}
                                    placeholder="Size" 
                                />
                            )} />
                        { errors.size && <span className="form-error">{ errors.size.message }</span>}
                    </div>
                    <button type="submit" className="clean btn variant primary form-button" disabled={isLoading}>Submit</button>
                </form>
            </Card>
        </section>
    )
}

export default EditProductForm;