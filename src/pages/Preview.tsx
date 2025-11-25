import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type TResumeBuilder } from "../assets/assets";
import Loader from "../components/Loader";
import ResumePreview from "../components/home/ResumePreview";
import { ArrowLeftIcon } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
	const { resumeId } = useParams();

	const [loading, setLoading] = useState(true);
	const [resumeData, setResumeData] = useState<TResumeBuilder | null>(null);

	const loadResume = async () => {
		try {
			const { data } = await api.get(`/api/resumes/public/${resumeId}`);
			setResumeData(data.resume);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadResume();
	}, []);

	return resumeData ? (
		<div className="bg-slate-100">
			<div className="max-w-3xl mx-auto">
				<ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="py-4 bg-white" />
			</div>
		</div>
	) : loading ? (
		<Loader />
	) : (
		<div className="flex flex-col items-center justify-center h-screen">
			<p className="text-center text-6xl text-slate-400 font-medium">Resume not found</p>
			<a
				href="/"
				className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 h-9 m-1 fing-offset-1 ring-1 ring-green-400 rounded-lg flex items-center transition-colors"
			>
				<ArrowLeftIcon className="size-4 mr-2" /> go to home page
			</a>
		</div>
	);
};

export default Preview;
