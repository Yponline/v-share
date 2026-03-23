const Title = ({ title }: { title: string }) => {
	return (
		<h1 className="text-3xl font-bold text-gray-900 md:text-4xl ">
			{title}
		</h1>
	);
};

export default Title;
