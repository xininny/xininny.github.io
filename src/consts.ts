// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'xininny';
export const SITE_DESCRIPTION = "xininny's blog";

// 프로필 정보 (홈 프로필 카드 / 헤더 소셜 링크에서 사용)
export const PROFILE = {
	name: 'xininny',
	role: 'Security Engineer',
	bio: 'Seize the moment',
	avatar: '/avatar.png',
	email: 'xininny@gmail.com',
	github: 'xininny',
	linkedin: 'mi-jin-jeon-600aa3312',
};

export const SINCE = 2024;

// 카테고리 → Notion 색상 매핑 (PostCard/필터에서 nt-* 클래스로 사용)
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
