import type { Project } from '~/types';
import type { Route } from './+types/index';
import ProjectCard from '~/components/project-card';
import { useState } from 'react';
import PaginationButton from '~/components/pagination-button';

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch('http://localhost:8000/projects');
	const data = await res.json();

	return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
	const { projects } = loaderData as { projects: Project[] };
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 2;

	//calcula total de páginas
	const totalPages = Math.ceil(projects.length / projectsPerPage);

	//pega projetos da página atual
	const indexOfLast = currentPage * projectsPerPage;
	const indexOfFirst = indexOfLast - projectsPerPage;
	const currentProjects = projects.slice(indexOfFirst, indexOfLast);

	return (
		<>
			<h2 className='text-3xl font-bold text-white mb-8'>🚀 Meus Projetos</h2>
			<div className='grid gap-6 sm:grid-cols-2'>
				{currentProjects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
			<PaginationButton
				totalPages={totalPages}
				currentPage={currentPage}
				OnPageChange={setCurrentPage}
			/>
		</>
	);
};

export default ProjectsPage;
