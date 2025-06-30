import React from "react";
import { ReactNode } from 'react';

interface GridBackgroundProps {
	children: ReactNode;
}

const GridBackground = ({ children }: GridBackgroundProps) => {
	return (
		<div className="w-full min-h-screen bg-[#18181b] text-white relative">
			{children}
		</div>
	);
};
export default GridBackground;
