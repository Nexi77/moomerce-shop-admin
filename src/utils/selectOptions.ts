import { OptionModel } from "@/types/app"

export const SizeOptions = (): OptionModel[] => [
    { label: 'XS', value: 'XS'},
    { label: 'S', value: 'S'},
    { label: 'M', value: 'M'},
    { label: 'L', value: 'L'},
    { label: 'XL', value: 'XL'},
    { label: 'XXL', value: 'XXl'}
]

export const ColorOptions = (): OptionModel[] => [
    { label: 'Green', value: 'green' },
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'White', value: 'white' },
    { label: 'Black', value: 'black' },
    { label: 'Pink', value: 'pink' },
    { label: 'Gray', value: 'gray' },
];

export const CategoryOptions = (): OptionModel[] => [
    { label: 'T-shirt', value: 't-shirt' },
    { label: 'Man', value: 'man' },
    { label: 'Woman', value: 'woman' },
    { label: 'Glasses', value: 'glasses' },
]