import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star } from 'lucide-react';

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
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    month: 'short', 
    year: 'numeric' 
  });
}

const getStarRating = (proficiency: string) => {
  const maxStars = 5;
  let filledStars = 0;

  switch (proficiency) {
    case 'Débutant': filledStars = 1; break;
    case 'Intermédiaire': filledStars = 3; break;
    case 'Avancé': filledStars = 5; break;
    default: filledStars = 0;
  }

  return (
    <div className="flex">
      {Array.from({ length: filledStars }, (_, i) => (
        <Star key={`filled-${i}`} className="w-4 h-4 fill-current text-primary" />
      ))}
      {Array.from({ length: maxStars - filledStars }, (_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const TemplateC = forwardRef<HTMLDivElement, Props>(({
  personalDetails,
  file,
  theme,
  experiences,
  educations,
  languages,
  skills,
  hobbies,
  download
}, ref) => {
  return (
    <div 
      ref={ref} 
      className={`flex flex-col p-12 w-[950px] h-[1200px] shadow-xl rounded-lg bg-base-100 ${download ? 'mb-10' : ''}`}
      data-theme={theme}
    >
      {/* En-tête avec photo et infos personnelles */}
      <div className="flex items-center border-b-2 border-primary/20 pb-8 mb-8">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={300}
              height={300}
              className="w-full h-full object-cover"
              alt="Photo"
              onLoadingComplete={() => {
                if (typeof file !== 'string') URL.revokeObjectURL(URL.createObjectURL(file));
              }}
            />
          )}
        </div>
        
        <div className="ml-8 flex-1">
          <h1 className="text-4xl font-bold text-primary">{personalDetails.fullName}</h1>
          <h2 className="text-2xl font-light mt-1">{personalDetails.postSeeking}</h2>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm">
            {personalDetails.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span>{personalDetails.phone}</span>
              </div>
            )}
            
            {personalDetails.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>{personalDetails.email}</span>
              </div>
            )}
            
            {personalDetails.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{personalDetails.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-3 gap-8 flex-1">
        {/* Colonne gauche */}
        <div className="col-span-1">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2 mb-3">Profil</h3>
            <p className="text-sm leading-relaxed">{personalDetails.description}</p>
          </div>

          {/* Compétences */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2 mb-3">Compétences</h3>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, i) => (
                <div key={i} className="bg-primary/10 rounded-lg px-3 py-2 text-center">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Langues */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2 mb-3">Langues</h3>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-xs text-primary/80">{lang.proficiency}</span>
                  </div>
                  {getStarRating(lang.proficiency)}
                </div>
              ))}
            </div>
          </div>

          {/* Centres d'intérêt */}
          <div>
           <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2 mb-3">Centres d&rsquo;intérêt</h3>

            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby, i) => (
                <div key={i} className="bg-primary/10 rounded-full px-3 py-1 text-sm">
                  {hobby.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="col-span-2 border-l border-primary/10 pl-8">
          {/* Expériences */}
          <div className="mb-10">
            <h3 className="flex items-center text-lg font-bold text-primary mb-4">
              <Briefcase className="w-5 h-5 mr-2" />
              Expériences Professionnelles
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h4 className="text-lg font-bold">{exp.jobTitle}</h4>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-semibold text-primary">{exp.companyName}</span>
                    <span className="text-primary/80">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div>
            <h3 className="flex items-center text-lg font-bold text-primary mb-4">
              <GraduationCap className="w-5 h-5 mr-2" />
              Formations
            </h3>
            
            <div className="space-y-6">
              {educations.map((edu, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h4 className="text-lg font-bold">{edu.degree}</h4>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-semibold text-primary">{edu.school}</span>
                    <span className="text-primary/80">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TemplateC.displayName = 'TemplateC';

export default TemplateC;