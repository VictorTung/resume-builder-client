import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalImageTemplate from "../templates/MinimalImageTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import type { TResumeBuilder, Template } from "../../assets/assets";

const ResumePreview = ({
	data,
	template,
	accentColor,
	classes = "",
}: {
	data: TResumeBuilder;
	template: Template;
	accentColor: string;
	classes?: string;
}) => {
	const renderTemplate = () => {
		switch (template) {
			case "modern":
				return <ModernTemplate data={data} accentColor={accentColor} />;
			case "minimal":
				return <MinimalTemplate data={data} accentColor={accentColor} />;
			case "minimal-image":
				return <MinimalImageTemplate data={data} accentColor={accentColor} />;
			default:
				return <ClassicTemplate data={data} accentColor={accentColor} />;
				break;
		}
	};
	return (
		<div className="w-full bg-gray-100">
			<div className={"border border-gray-200 print:shadow-none print:border-none " + classes} id="resume-preview">
				{renderTemplate()}
			</div>
			<style>
				{`
					@page {
						size: letter;
						margin: 0;
					}

					@media print {
						html,
						body {
							width: 8.5in;
							height: 11in;
							overflow: hidden;
						}
						body * {
							visibility: hidden;
						}
						#resume-preview,
						#resume-preview * {
							visibility: visible;
						}
						#resume-preview {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: auto;
							margin: 0;
							padding: 0;
							box-shadow: none !important;
							border: none !important;
						}
					}
				`}
			</style>
		</div>
	);
};

export default ResumePreview;
