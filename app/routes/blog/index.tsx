import type { PostMeta } from '~/types';
import type { Route } from './+types';
import { Link } from 'react-router';
import PostCard from '~/components/post-card';
import { useState } from 'react';
import PaginationButton from '~/components/pagination-button';
import PostFilter from '~/components/posts-filter';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
	const url = new URL('/posts-meta.json', request.url);
	const response = await fetch(url.href);

	if (!response.ok) throw new Error('Failed to fetch data');

	const data = await response.json();

	data.sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
	const { posts } = loaderData;
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const postPerPage = 3;

	const filteredPosts = posts.filter((post) => {
		const query = searchQuery.toLocaleLowerCase();
		return (
			post.title.toLocaleLowerCase().includes(query) ||
			post.excerpt.toLocaleLowerCase().includes(query)
		);
	});

	const totalPages = Math.ceil(filteredPosts.length / postPerPage);
	const indexOfLast = currentPage * postPerPage;
	const indexOfFirst = indexOfLast - postPerPage;
	const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

	return (
		<div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
			<h2 className='text-3xl text-white font-bold mb-8'>📝 Blog</h2>
			<PostFilter
				searchQuery={searchQuery}
				onSearchChange={(query) => {
					setSearchQuery(query);
					setCurrentPage(1);
				}}
			/>
			<div>
				{currentPosts.length === 0 ? (
					<p className='text-gray-400 text-center'>No posts found</p>
				) : (
					currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
				)}
			</div>

			{totalPages > 1 && (
				<PaginationButton
					currentPage={currentPage}
					totalPages={totalPages}
					OnPageChange={(page) => setCurrentPage(page)}
				></PaginationButton>
			)}
		</div>
	);
};

export default BlogPage;
