import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width='1em'
        height='1em'
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <path
            d='M32 32C27.7565 32 23.6869 30.3143 20.6863 27.3137C17.6857 24.3131 16 20.2435 16 16C16 11.7565 17.6857 7.68687 20.6863 4.68629C23.6869 1.68571 27.7565 0 32 0C36.2435 0 40.3131 1.68571 43.3137 4.68629C46.3143 7.68687 48 11.7565 48 16C48 20.2435 46.3143 24.3131 43.3137 27.3137C40.3131 30.3143 36.2435 32 32 32ZM32 44C44.744 44 56.18 46.284 64 56.252V64H0V56.252C7.82 46.28 19.256 44 32 44Z'
            fill='currentColor'
        />
    </svg>
);
export default SvgComponent;
