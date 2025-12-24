import Image from 'next/image';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { Container } from '@/components/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { getStrapiMedia } from '@/lib/strapi-utils';

export default async function About() {
  const {
    data: {
      status_label,
      full_name,
      profile_image,
      bio,
      tech_stack_title,
      tools,
      cta_label,
    },
  } = await api.getAbout();

  const imageUrl = getStrapiMedia(profile_image, 'large');
  console.log(tools);

  return (
    <Container className="flex flex-col gap-12 items-start p-8 lg:flex-row md:items-stretch">
      <div className="relative w-full md:basis-1/2 flex-none aspect-square min-w-0">
        <Image
          src={imageUrl}
          alt={full_name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-3xl shadow-xl"
          priority
        />
      </div>
      <section className="flex-1 md:basis-1/2 flex flex-col justify-between min-h-0 min-w-0 gap-6">
        <div>
          <Badge variant="default" className="px-4 py-3 w-fit text-sm">
            <span className="size-2 mr-2 rounded-full bg-indigo-300 animate-pulse" />
            {status_label}
          </Badge>
          <h1 className="my-6 text-5xl font-bold tracking-tight">
            Hi, I&apos;m {full_name}
          </h1>
          <BlocksRenderer content={bio} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">{tech_stack_title}</h3>
          <div className="flex flex-wrap gap-2 gap-y-3">
            {tools.map((tool) => (
              <Badge
                variant="secondary"
                key={tool.id}
                className="px-3 py-3 text-md"
              >
                {tool.label}
              </Badge>
            ))}
          </div>
          <Button className="w-fit text-lg py-5 px-6 cursor-pointer" asChild>
            <a href="mailto:mikhailbelov737@gmail.com">{cta_label}</a>
          </Button>
        </div>
      </section>
    </Container>
  );
}
