"use client";

import Image from "next/image";

interface Project {
  title: string;
  link: string;
  image: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  addToRefs: (el: HTMLAnchorElement | null, index: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  addToRefs,
}) => {
  return (
    <a
      ref={(el) => addToRefs(el, index)}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={256}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full shadow-lg group-hover:bg-white group-hover:text-indigo-600 transition-colors">
          Ver Projeto
        </span>
      </div>
    </a>
  );
};

export default ProjectCard;
