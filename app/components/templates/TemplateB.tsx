import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { BriefcaseBusiness, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

type Props = {
  personalDetails: PersonalDetails;
  file: File | null;
  theme: string;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  download?: boolean;
};

function formatDate(dateString: string): string {
  if (!dateString) return 'En cours';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

const TemplateB = forwardRef<HTMLDivElement, Props>(({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download }, ref) => {
  return (
      <div
  ref={ref}
  className={`flex p-16 w-[950px] shadow-lg ${download ? 'mb-10' : ''}`}
  data-theme={theme}
>
      {/* COLONNE GAUCHE */}
      <div className="w-1/3 bg-primary text-primary-content p-6 h-full">
        {/* PHOTO */}
        {file && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mx-auto mb-6">
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              alt="Photo profil"
            />
          </div>
        )}

        {/* NOM ET TITRE */}
        <h1 className="text-2xl font-bold text-center uppercase mb-2">{personalDetails.fullName}</h1>
        <div className="h-1 w-16 bg-white mx-auto mb-6"></div>
        <h2 className="text-lg text-center font-medium uppercase">{personalDetails.postSeeking}</h2>

        {/* SECTION CONTACT */}
        <div className="mt-8">
          <h3 className="font-bold uppercase mb-4 text-lg border-b border-white pb-1">Contact</h3>
          <ul className="space-y-3">
            {personalDetails.phone && (
              <li className="flex items-center">
                <Phone className="w-4 mr-3" />
                <span className="text-sm">{personalDetails.phone}</span>
              </li>
            )}
            {personalDetails.email && (
              <li className="flex items-center">
                <Mail className="w-4 mr-3" />
                <span className="text-sm">{personalDetails.email}</span>
              </li>
            )}
            {personalDetails.address && (
              <li className="flex items-center">
                <MapPin className="w-4 mr-3" />
                <span className="text-sm">{personalDetails.address}</span>
              </li>
            )}
          </ul>
        </div>

        {/* COMPÉTENCES (version corrigée) */}
        <div className="mt-8">
          <h3 className="font-bold uppercase mb-4 text-lg border-b border-white pb-1">Compétences</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="badge badge-outline badge-sm text-white bg-white bg-opacity-20"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* LANGUES */}
        <div className="mt-8">
          <h3 className="font-bold uppercase mb-4 text-lg border-b border-white pb-1">Langues</h3>
          <ul className="space-y-3">
            {languages.map((lang, index) => (
              <li key={index} className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-xs">{lang.proficiency}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* LOISIRS */}
        <div className="mt-8">
          <h3 className="font-bold uppercase mb-4 text-lg border-b border-white pb-1">Loisirs</h3>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span 
                key={index} 
                className="text-xs px-3 py-1 bg-white bg-opacity-20 rounded-full"
              >
                {hobby.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE */}
      <div className="w-2/3 p-8">
        {/* PROFIL */}
        <section className="mb-8">
          <h3 className="font-bold text-xl uppercase mb-3 text-primary border-b border-primary pb-1">Profil</h3>
          <p className="text-sm text-gray-700">{personalDetails.description}</p>
        </section>

        {/* EXPERIENCES */}
        <section className="mb-8">
          <h3 className="font-bold text-xl uppercase mb-3 text-primary border-b border-primary pb-1 flex items-center">
            <BriefcaseBusiness className="mr-2 w-5" />
            Expériences
          </h3>
          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <div key={index} className="pl-3 border-l-2 border-primary">
                <h4 className="font-bold text-gray-900">{exp.jobTitle}</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span className="font-medium">{exp.companyName}</span>
                  <span className="italic">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FORMATIONS */}
        <section>
          <h3 className="font-bold text-xl uppercase mb-3 text-primary border-b border-primary pb-1 flex items-center">
            <GraduationCap className="mr-2 w-5" />
            Formations
          </h3>
          <div className="space-y-5">
            {educations.map((edu, index) => (
              <div key={index} className="pl-3 border-l-2 border-primary">
                <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span className="font-medium">{edu.school}</span>
                  <span className="italic">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

TemplateB.displayName = 'TemplateB';

export default TemplateB;