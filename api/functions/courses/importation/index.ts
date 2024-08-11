import { CourseImportRequest, importCourse } from "../../course";

interface Env {
	YOUTUBE_API_KEY: string;
	DATABASE: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	const body = await context.request.json<CourseImportRequest>();

	const course = await importCourse(
		body,
		context.env.YOUTUBE_API_KEY,
		context.env.DATABASE
	);

	const responseBody = { ...body, ...course };

	const response = new Response(JSON.stringify(responseBody), {
		headers: {

			"Content-Type": "application/json",
		},
	});

	return response;
};

export const onRequestOptions: PagesFunction = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "86400",
		},
	});
};
