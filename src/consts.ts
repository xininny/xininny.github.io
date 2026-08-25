export const SITE_TITLE = 'xininny';
export const SITE_DESCRIPTION = "xininny's blog";

export const PROFILE = {
	name: 'xininny',
	role: 'Security Engineer',
	bio: 'Seize the moment',
	avatar: '/avatar.png',
	email: 'xininny@gmail.com',
	github: 'xininny',
	linkedin: 'mi-jin-jeon-600aa3312',
};

const CATEGORY_COLORS: Record<string, string> = {
	'✏️ Study': 'blue',
	'🌐 Extracurriculars': 'orange',
	'🍎 Project': 'red',
	'💾 Record': 'green',
	'🧪 Lab': 'purple',
	'😎 Daily': 'yellow',
};

export function notionColor(name?: string): string {
	return CATEGORY_COLORS[name ?? ''] ?? 'gray';
}
