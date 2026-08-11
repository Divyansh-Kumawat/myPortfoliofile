// Geometric bracket monogram — a vector take on the `<Divyansh>` motif
// already used in the footer. Pure white, sharp, no gradients.
const Logo = ({ size = 28, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="none"
        className={className}
        role="img"
        aria-label="Divyansh Kumawat"
    >
        <path d="M0 0h96v64H64v128h32v64H0V0Z" fill="currentColor" />
        <path d="M160 0h96v256h-96v-64h32V64h-32V0Z" fill="currentColor" />
        <path d="M104 96h48v64h-48V96Z" fill="currentColor" />
    </svg>
);

export default Logo;
