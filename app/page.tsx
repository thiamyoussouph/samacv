"use client";

import { Eye, RotateCw, Save } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";
import html2pdf from "html2pdf.js";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import SkillForm from "./components/SkillForm";
import HobbyForm from "./components/HobbyForm";

import TemplateA from "./components/templates/TemplateA";
import TemplateB from "./components/templates/TemplateB";
import TemplateC from "./components/templates/TemplateC";
import TemplateD from "./components/templates/TemplateD";



import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/presets";

export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset);
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<string>("cupcake");
  const [zoom, setZoom] = useState<number>(163);
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset);
  const [educations, setEducations] = useState<Education[]>(educationsPreset);
  const [languages, setLanguages] = useState<Language[]>(languagesPreset);
  const [skills, setSkills] = useState<Skill[]>(skillsPreset);
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [extraPages, setExtraPages] = useState<number>(0);

  const [selectedTemplate, setSelectedTemplate] = useState<'A' | 'B' | 'C' | 'D'>('A');


  useEffect(() => {
    const defaultImageUrl = "/profile.jpeg";
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpeg", { type: blob.type });
        setFile(defaultFile);
      });
  }, []);

  const cvPreviewRef = useRef(null);

  

const handleDownloadPdf = async () => {
  const element = cvPreviewRef.current;
  if (!element) return;

  try {
    // Génération du canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    let position = 0;
    let heightLeft = imgHeight;

    while (heightLeft > 0) {
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;

      if (heightLeft > 0) pdf.addPage();
    }

    // Téléchargement
    pdf.save('mon_cv.pdf');

    // ✅ Fermer le modal après téléchargement
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) modal.close();

    // ✅ Lancer les confettis au-dessus de tout
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 999999  // très élevé pour être au-dessus du modal
      });
    }, 100); // léger délai pour éviter que ce soit masqué par le modal

  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
  }
};



  const themes: string[] = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
    "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe",
    "black", "luxury", "dracula", "cmyk", "autumn", "business",
    "acid", "lemonade", "night", "coffee", "winter", "dim",
    "nord", "sunset"
  ];

  const handleResetPersonalDetails = () => setPersonalDetails({
    fullName: '', email: '', phone: '', address: '', photoUrl: '', postSeeking: '', description: ''
  });
  const handleResetExperiences = () => setExperience([]);
  const handleResetEducations = () => setEducations([]);
  const handleResetLanguages = () => setLanguages([]);
  const handleResetSkills = () => setSkills([]);
  const handleResetHobbies = () => setHobbies([]);

  const renderTemplate = (download = false) => {
    const props = {
      personalDetails, file, theme, experiences, educations,
      languages, hobbies, skills, download, ref: download ? cvPreviewRef : null,
    };
    if (selectedTemplate === "C") return <TemplateC {...props} />;
    if (selectedTemplate === "B") return <TemplateB {...props} />;
    if (selectedTemplate === "D") return <TemplateD {...props} />;

    return <TemplateA {...props} />;
   

  };

  return (
    <div>
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">
          {/* Panneau gauche */}
          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">sama<span className="text-accent">cv</span></h1>
              <button className="btn btn-accent" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                Prévisualiser <Eye className="w-4" />
              </button>
            </div>
            <button
  onClick={() => setExtraPages(prev => prev + 1)}
  className="btn btn-outline btn-accent my-4"
>
  ➕ Ajouter une page
</button>

            <div className="flex flex-col gap-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="badge badge-accent badge-outline">Qui êtes-vous ?</h1>
                <button onClick={handleResetPersonalDetails} className="btn btn-accent btn-sm"><RotateCw className="w-4" /></button>
              </div>
              <PersonalDetailsForm personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} setFile={setFile} />
              <div className="flex justify-between items-center">
                <h1 className="badge badge-accent badge-outline">Expériences</h1>
                <button onClick={handleResetExperiences} className="btn btn-accent btn-sm"><RotateCw className="w-4" /></button>
              </div>
              <ExperienceForm experience={experiences} setExperiences={setExperience} />
              <div className="flex justify-between items-center">
                <h1 className="badge badge-accent badge-outline">Éducations</h1>
                <button onClick={handleResetEducations} className="btn btn-accent btn-sm"><RotateCw className="w-4" /></button>
              </div>
              <EducationForm educations={educations} setEducations={setEducations} />
              <div className="flex justify-between items-center">
                <h1 className="badge badge-accent badge-outline">Langues</h1>
                <button onClick={handleResetLanguages} className="btn btn-accent btn-sm"><RotateCw className="w-4" /></button>
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />
              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-accent badge-outline">Compétences</h1>
                    <button onClick={handleResetSkills} className="btn btn-accent btn-sm"><RotateCw className="w-4" /></button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>
                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-accent badge-outline">Loisirs</h1>
                    <button onClick={handleResetHobbies} className="btn btn-accent btn-sm"><RotateCw className="w-4" /></button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>
          </div>

          {/* Panneau droit */}
          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
              <input type="range" min={50} max={200} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="range range-xs range-accent" />
              <p className="ml-4 text-sm text-accent">{zoom}%</p>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="select select-bordered fixed z-[9999] select-sm top-12 right-5">
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>{themeName}</option>
              ))}
            </select>
            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value as 'A' | 'B' | 'C')} className="select select-bordered fixed z-[9999] select-sm top-[7.5rem] right-5">
              <option value="A">Modèle Classique</option>
              <option value="B">Modèle Centré</option>
              <option value="C">Modèle Simple</option>
              <option value="D">Modèle Élégant</option>
            </select>
            <div className="flex justify-center items-center" style={{ transform: `scale(${zoom / 200})` }}>
              {renderTemplate()}
            </div>
          </div>
        </section>

        {/* Modal PDF */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className="mt-5">
              <div className="flex justify-end mb-5">
                <button onClick={handleDownloadPdf} className="btn btn-accent">
                  Télécharger <Save className="w-4" />
                </button>
              </div>
              <div className="w-full max-w-full overflow-auto">
                <div className="w-full flex justify-center items-center">
                  {renderTemplate(true)}
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Désolé, le CV Builder est uniquement accessible sur ordinateur.</h1>
              <Image src="/sad-sorry.gif" width={500} height={500} alt="Erreur mobile" className="mx-auto my-6" />
              <p className="py-6">Veuillez utiliser un ordinateur pour créer et télécharger votre CV.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
