"use client";

import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";

interface CartIconProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
}

const cartVariants: Variants = {
    normal: {
        scale: 1,
        rotate: 0,
    },
    animate: {
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const pathVariants: Variants = {
    normal: {
        pathLength: 1,
        opacity: 1,
    },
    animate: {
        pathLength: [0, 1],
        opacity: [0.3, 1],
        transition: {
            duration: 0.8,
            ease: "easeInOut",
        },
    },
};

export const CartIcon = ({
    width = 20,
    height = 20,
    strokeWidth = 2,
    stroke = "currentColor",
    ...props
}: CartIconProps) => {
    const controls = useAnimation();

    return (
        <div
            style={{
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onMouseEnter={() => controls.start("animate")}
            onMouseLeave={() => controls.start("normal")}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <motion.circle
                    cx="9"
                    cy="21"
                    r="1"
                    variants={cartVariants}
                    animate={controls}
                    initial="normal"
                />
                <motion.circle
                    cx="20"
                    cy="21"
                    r="1"
                    variants={cartVariants}
                    animate={controls}
                    initial="normal"
                />
                <motion.path
                    d="m1 1 4 4 14 1-1 7H6"
                    variants={pathVariants}
                    animate={controls}
                    initial="normal"
                />
            </svg>
        </div>
    );
};

export default CartIcon;