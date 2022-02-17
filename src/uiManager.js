import signal from "signal-js";
import router from "./router";

// DOM references
const playableSections = document.querySelectorAll("section.playable-section");
const backgroundContainer = document.querySelector("div#background");

const subtitlesContainer = document.querySelector("div#subtitles-container");
const subtitlesButton = document.querySelector("button#subtitles-toggle");
const subtitlesContent = document.querySelector("p#subtitles-content");

const subtitles = [
  "*Une voix mystérieuse prend la parole :* Maria Anna Mozart, bienvenue dans ton inter vitam. Il te reste une dernière étape avant le repos éternel. Aujourd’hui, il est temps de révéler le secret que tu as gardé au fond de toi toutes ces années. <br> <strong>Maria</strong> : J’imagine que vous avez raison, cela ne sert plus à rien de le cacher désormais... L’homme représenté sous vos yeux avec cette statue, c’est mon frère, Wolfgang Amadeus Mozart. Il y est représenté mourant, officiellement d’une fièvre aigüe. Mais en réalité, la cause de sa mort, c’est moi. Je l’ai tué... Mais laissez-moi vous expliquer comment j’en suis arrivée à ce point, qu’est-ce-qui m’a poussé à commettre cet acte terrible.",
  "Tout commence dès ma naissance, en 1751. Père, lui-même musicien, me fait découvrir la musique très tôt. Rapidement, plus qu’un passe-temps, elle devient ma passion et mes parents sont fiers de moi. Interprétation au clavecin, composition d'œuvres : je suis une vraie enfant prodige ! Quelques années plus tard, en 1756, mon petit frère Wolfgang vient au monde. Âgé d’à peine quatre ans, il découvre le clavicorde, puis le violon. Et très vite, les compliments changent de destinataire. Mais j’accepte cette part d’ombre. Tous les deux, on se prend de passion à avancer main dans la main, on forme un vrai duo. Père nous fait faire des représentations dans tous les salons des hautes-sociétés d’Europe. Partout où on passe, les gens se souviennent de ces deux enfants qui jouent en réalisant de vrais numéros : les yeux fermés, avec un seul doigt, toutes sortes de prestations qui amusent et fascinent les adultes qui nous regardent. Je vis en plein cœur d’un rêve familial...",
  "Mais, dès 1769, mes 18 ans atteints, le regard de père change. Selon lui, je deviens une femme et ma place n’est plus sur scène, je dois rejoindre le foyer et me marier. Je me retrouve donc déléguée au second plan, tandis que mon frère, lui, continue à briller au travers des représentations. Encore très attachée à lui, je lui envoie souvent les compositions que je continue d’écrire à la maison, mais je me retrouve toujours sans réponse. Père décide de les détruire à chaque fois, estimant qu’une femme ne doit pas composer. Amadeus, lui, me dit de persévérer, mais quel hypocrite, il n’a jamais rien fait pour m’aider, alors qu’on s’est toujours promis d’aller loin ensemble. Quel gâchis. Je ne comprends pas pourquoi je dois laisser tomber ma passion et m’enfermer auprès de ma mère dans le quotidien habituel du coin : messes, promenades, et surtout cours de piano, que Père m’oblige à donner pour financer la tournée de Wolfgang.",
  "Puis un jour, j’apprends qu’il joue dans ces concerts mes propres morceaux, que J’AI composés ! Tout cela, dans mon dos bien sûr ! C’est injuste, je participe au succès de mon frère sans même pouvoir en profiter ! Je suis folle de rage, trahie et jalouse. Pourquoi profite-t-il de mon talent ? Mais surtout, pourquoi a-t-il le droit de vivre de la musique et pas moi ? Mes espoirs brisés, je rentre dans une dépression, à broyer du noir. Les années défilent, et ce qui devait arriver arriva : après m’avoir trahie, Wolfgang a voulu laisser tomber à son tour celui qui avait tout fait pour lui : père. Son émancipation, en février 1778, me rapproche certes de mon père, mais elle fracture la famille entière. Égoïste. J’en pleure des jours entiers. Nous qui devions rester une famille soudée et prospère, nous ne sommes plus qu’une famille déchirée, par sa faute. C’est la goutte de trop. De plus en plus régulièrement, des pensées sombres sur le destin tragique de mon frère m’envahissent... Mais, dès 1769, mes 18 ans atteints, le regard de père change. Selon lui, je deviens une femme et ma place n’est plus sur scène, je dois rejoindre le foyer et me marier. Je me retrouve donc déléguée au second plan, tandis que mon frère, lui, continue à briller au travers.",
  "Le temps passe, et on se retrouve en 1791. Wolfgang vit désormais à Vienne avec sa femme. De mon côté, mes pensées sombres se transforment en un véritable plan d’action. Alors je lève les voiles et je pars en direction de la capitale autrichienne. En suivant mon plan à la lettre, je rencontre un homme, tapis dans les sombres ruelles de la ville. Je lui achète une fiole d’arsenic, puis je mène mes recherches pour connaître les habitudes de mon frère. Très vite, je remarque qu’il se rend à la taverne, tous les soirs, avant de rentrer tard dans la nuit, éméché, auprès de sa compagne.",
  "Alors, je décide de passer à l’action en fin de soirée, quand l’ivresse s’empare des hommes. Discrètement, je m’approche du comptoir lors d’un moment d'inattention et je verse le contenu de ma fiole dans son verre de Cognac. Ivre mort, Wolfgang rentre chez lui. Il rejoint sa maîtresse pour une dernière nuit. Ce 5 février, mon frère s’éteint subitement. Cela fait des années que je garde ce secret enfoui en moi, il est là jour et nuit, à me ronger de l’intérieur. Je revois les instants de complicité que nous partagions lui et moi dans notre enfance. Pourtant, étrangement, je ne regrette rien. Wolfgang a volé ma vie, il s’est accaparé mon succès. Ces douces musiques que vous entendez, vous pensez qu’elles sont de lui n’est ce pas ? Et bien elles sont de moi en réalité, DE MOI, pas de lui ! Ce sont ses actes qui l’ont condamnée à ce triste destin. Et honnêtement, si je devais recommencer, je ne changerais rien.",
];

const uiManager = {
  init() {
    this.expStarted = false;

    // Events
    signal.on("changeScreen", this.onChangeScreen);

    // Open / close informations buttons
    document.querySelector("button#open-infos").addEventListener("click", () => {router.showScreen(3)});
    document.querySelector("button#close-infos").addEventListener("click", () => {router.showScreen(1)});
    // Start / end exp
    document.querySelector("button#start-exp-btn").addEventListener("click", this.onStartExperience);
    document.querySelector("button#back-menu-btn").addEventListener("click", () => {router.showScreen(1)});
    // Subtitles
    subtitlesButton.addEventListener("click", this.onToggleSubtitles);

    // Close act popup buttons
    document.querySelectorAll("button.playSong").forEach((btn) => {
      btn.addEventListener("click", () => {          
        document.querySelector("section#act1").classList.remove("active");
        document.querySelector("section#act2").classList.remove("active");
        document.querySelector("section#act3").classList.remove("active");
      });
    });
  },

  onChangeScreen(index){
    // Active / unactive playables sections
    for(let i = 0; i < playableSections.length; i++){
      if(i == index)
        playableSections[i].classList.add("active");
      else
        playableSections[i].classList.remove("active");
    }

    // Update subtitles
    if(index > 3 && index < 8) {
      if(index == 4) {
        subtitlesButton.classList.add("active"); // Show subtitles toggle
      }
      
      subtitlesContent.innerHTML = subtitles[index - 4]; // Update subtitles text
    }
    else // Don't show subtitle toggle if there is no subtitles
      subtitlesButton.classList.remove("active");
    
    // Background positions and colors
    backgroundContainer.className = "step-" + index;
  },

  onStartExperience() {
      router.showScreen(2);
  },

  onToggleSubtitles() {
      subtitlesContainer.classList.toggle("active");
  }
};

export default uiManager;