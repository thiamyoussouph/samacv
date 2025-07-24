"use client";

import { forwardRef } from "react";
import { PersonalDetails, Experience, Education, Language, Skill, Hobby } from "@/type";
import Image from "next/image";
import { Briefcase, GraduationCap, Mail, Phone, MapPin, Star } from "lucide-react";

interface Props {
  personalDetails: PersonalDetails;
  file: File | null;
  theme: string;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  download?: boolean;
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

const TemplateD = forwardRef<HTMLDivElement, Props>(
  ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies }, ref) => {
    return (
      <div ref={ref} data-theme={theme} className="bg-base-100 text-base-content">
        {/* Page 1 */}
        <div className="w-[210mm] min-h-[297mm] mx-auto shadow-xl p-10 flex page-break">
          {/* Colonne gauche */}
          <div className="w-1/3 bg-gradient-to-b from-primary to-primary-focus p-6 text-primary-content relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20"></div>
            <div className="absolute bottom-10 -left-10 w-32 h-32 rounded-full bg-primary/20"></div>

            <div className="relative z-10 mt-8 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-primary-content shadow-xl">
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Photo de profil"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="relative z-10 mt-8 text-center">
              <h1 className="text-2xl font-bold mb-1">{personalDetails.fullName}</h1>
              <div className="bg-primary-content text-primary px-4 py-1 rounded-full inline-block">
                <p className="text-sm font-medium">{personalDetails.postSeeking}</p>
              </div>
            </div>

            <div className="relative z-10 mt-8 space-y-3">
              <div className="flex items-center">
                <div className="bg-primary-content p-2 rounded-full mr-3">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{personalDetails.email}</span>
              </div>

              <div className="flex items-center">
                <div className="bg-primary-content p-2 rounded-full mr-3">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{personalDetails.phone}</span>
              </div>

              <div className="flex items-center">
                <div className="bg-primary-content p-2 rounded-full mr-3">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{personalDetails.address}</span>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <h2 className="text-lg font-bold mb-3 text-center">Compétences</h2>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-primary-content/10 backdrop-blur-sm border border-primary-content/20 rounded-lg p-2 text-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <h2 className="text-lg font-bold mb-3 text-center">Langues</h2>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-sm font-medium mb-1">{lang.language}</span>
                    {getStarRating(lang.proficiency)}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2 mb-3">Centres d&rsquo;intérêt</h3>

              <div className="flex flex-wrap justify-center gap-2">
                {hobbies.map((hobby, index) => (
                  <div key={index} className="bg-primary-content/20 px-3 py-1 rounded-full text-sm">
                    {hobby.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="w-2/3 p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full"></div>

            <div className="relative z-10 mb-10">
              <div className="text-5xl text-primary opacity-20 absolute -left-2 -top-5"></div>
              <p className="text-sm italic pl-8 border-l-2 border-primary">
                {personalDetails.description}
              </p>
            </div>

            <div className="mb-10">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-primary mr-2" />
                <h2 className="text-xl font-bold">Expériences Professionnelles</h2>
              </div>

              <div className="relative pl-6 border-l-2 border-primary/20 space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-primary border-4 border-base-100"></div>
                    <div className="bg-base-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                          <p className="text-primary font-medium">{exp.companyName}</p>
                        </div>
                        <span className="text-sm bg-primary/10 px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 : Formations */}
        <div className="w-[210mm] min-h-[297mm] mx-auto shadow-xl p-10 page-break">
          <div className="flex items-center mb-6">
            <GraduationCap className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-bold">Formations</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {educations.map((edu, index) => (
              <div key={index} className="bg-base-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                <p className="text-primary font-medium">{edu.school}</p>
                <p className="text-sm mt-1">{edu.startDate} - {edu.endDate}</p>
                <p className="mt-2 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="text-xs opacity-70 text-right mt-10">
            Généré avec Samacv
          </div>
        </div>
      </div>
    );
  }
);

TemplateD.displayName = 'TemplateD';

export default TemplateD;
