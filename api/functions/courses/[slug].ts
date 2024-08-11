import { getCourse } from "../course";

interface Env {
	ACCEPTED_ORIGINS: string;
	DATABASE: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
	const slug = context.params.slug as string;

	const course = await getCourse(slug, context.env.DATABASE);

	const response = new Response(JSON.stringify(course), {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
		},
	});

	return response;
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "86400",
		},
	});
};
