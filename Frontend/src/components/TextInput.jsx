import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={localRef}
            className={`
                rounded-lg shadow-sm text-xs
                border border-[#e0e0e0]
                bg-[#F4F4F4]
                text-[#2C3E50]
                focus:outline-none focus:ring-2
                focus:border-[#1899D6]
                focus:ring-[#1899D6]
                transition
                w-full px-4 py-3 rounded bg-white text-[#2C3E50]  border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#1899D6] transition
                ${className}
            `}
        />
    );
}); 