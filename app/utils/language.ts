type TranslationKeys = keyof typeof translations;

export const getTranslation = (
  languageId?: string
): (typeof translations)["en"] => {
  const langKey = languageId as TranslationKeys;
  return translations[langKey] || translations.en;
};

const translations = {
  en: {
    contactUs: "CONTACT US",
    contactUsDescription:
      "Do not hesitate - contact us now for more information or a non-binding quote for our massage and wellness services. Whether you're hosting an event in Mallorca, Ibiza, or anywhere else in Spain, we are here to help!",
    name: "Name",
    email: "Email",
    phoneNumber: "Phone Number",
    message: "Message",
    submit: "Submit",
    phone: "Phone",
    treatments: "Treatments",
    categories: "Categories",
    giftCards: "Gift cards",
    bookNow: "Book now",
    company: "Company",
    contact_us_content:
      "Do not hesitate-contact us now for more information or a non-binding quote for our massage and wellness services. Whether you&apos;rehosting an event in Mallorca, Ibiza, or anywhere else in Spain, we are here to help!",
    events: "Events",
    event_title:
      "Tailored Wellness Experiences in Mallorca, Ibiza and across Spain",
    event_content:
      "We specialize in creating unique wellness events that bring relaxation and rejuvenation directly to you. Whether you're organizing a corporate wellness retreat, private event, or group wellness in Mallorca, Ibiza or across Spain to suit your needs. Our expert therapists are licensed, insured, and thoroughly vetted to ensure the highest standards of care and professionalism.",
    sport_event: "Sports Events",
    sport_event_content:
      "Yuhu offers stress-free sports event support in Mallorca, Ibiza, and Spain. Our mobile wellness services, including massages and personal training, ensure athletes recover and perform at their best.",
    wedding: "Weddings",
    wedding_event:
      "Make your wedding in Mallorca, Ibiza, or Spain unforgettable with Yuhu's mobile wellness services. From pre-wedding pampering to post-event recovery, we ensure relaxation for you and your guests.",
    charity_event: "Charity Events",
    charity_event_content:
      "Enhance your charity event in Mallorca, Ibiza, or Spain with Yuhu Wellness. We provide stress-relief treatments for organizers, participants, and volunteers, creating a calm and focused atmosphere.",
    retreat: "Retreats",
    retreat_event:
      "Yuhu delivers tailored wellness experiences for retreats in Mallorca, Ibiza, and Spain. From massages to relaxation therapies, we help create unforgettable, restorative getaways.",
    employee_wellness: "Employee Wellness",
    employee_wellness_content:
      "Yuhu Wellness brings mobile wellness services to Mallorca, Ibiza, and Spain, reducing workplace stress and boosting productivity with stress-relieving massages and fitness sessions.",
    incentive: "Incentives",
    incentive_content:
      "Reward your team with Yuhu Wellness' mobile massages and treatments in Mallorca, Ibiza, and Spain, motivating them with a rejuvenating and memorable experience.",
    client_hospitally: "Client Hospitality",
    client_hospitally_content:
      "Impress clients with Yuhu Wellness' luxurious massages and treatments across Mallorca, Ibiza, and Spain, creating relaxing and memorable hospitality experiences.",
    massage_gun: "Massage Gun",
    massage_gun_content:
      "Relax and relieve muscle tension. Perfect for post-workout recovery or daily muscle relief, it delivers powerful, soothing vibrations to target tight spots and promote relaxation.",
    oils: "Oils",
    oils_content:
      "Our oils are designed to nourish and hydrate your skin while providing a calming, soothing experience. Ideal for massages or daily self-care routines, they leave you feeling relaxed and rejuvenated.",
    super_patch: "Super Patch",
    super_patch_content:
      "Is a powerful, easy-to-use solution for quick muscle recovery. Simply apply to sore or tight areas to experience targeted relief, helping you get back to your routine faster and with less discomfort.",
    massage_candle: "Massage Candles",
    massage_candle_content:
      "Once melted, the wax transforms into a warm, luxurious massage oil that deeply moisturizes the skin while soothing your body and mind with a calming fragrance.",
    event_mobile_massage_title:
      "Mobile Massage in Spain & Italy – Luxury Wellness, Anytime, Anywhere",
    event_mobile_massage_subtitle:
      "Expert Massage & Beauty Treatments Delivered to Your Doorstep",
    event_mobile_massage_content:
      "Looking for the ultimate relaxation experience in Spain and Italy? Yuhu Wellness provides premium mobile massage services, bringing professional therapists directly to your home, hotel, yacht, or workplace. Whether you need a spot massage, relaxing massage , pedicure ,manicure or a facial treatment our expert team ensures a personalized wellness experience wherever you are.",
    meet_team: "Meet the Team",
    meet_team_content:
      "All of our professional massage therapists are fully licensed, insured, and rigorously vetted through our industry-leading security protocols. When you book a Yuhu Wellness service, be it a relaxing massage, a sports massage, a personal training or our beauty treatment sessions, you will receive a confirmation with your therapist's full name, professional bio, and details about their expertise, ensuring transparency and trust. We are committed to providing the highest level of comfort and security.",
  },
  es: {
    contactUs: "CONTÁCTANOS",
    contactUsDescription:
      "No dudes - contáctanos ahora para obtener más información o una cotización sin compromiso para nuestros servicios de masajes y bienestar. Ya sea que estés organizando un evento en Mallorca, Ibiza o en cualquier otro lugar de España, ¡estamos aquí para ayudarte!",
    name: "Nombre",
    email: "Correo electrónico",
    phoneNumber: "Número de teléfono",
    message: "Mensaje",
    submit: "Enviar",
    phone: "Teléfono",
    treatments: "Tratamientos",
    categories: "Categorías",
    giftCards: "Tarjetas regalo",
    bookNow: "Reservar ahora",
    company: "Empresa",
    contact_us_content:
      "Do not hesitate-contact us now for more information or a non-binding quote for our massage and wellness services. Whether you&apos;rehosting an event in Mallorca, Ibiza, or anywhere else in Spain, we are here to help!",
    events: "Eventos",
    event_title:
      "Experiencias de bienestar a medida en Mallorca, Ibiza y toda España",
    event_content:
      "Nos especializamos en crear eventos de bienestar únicos que le brindan relajación y rejuvenecimiento directamente. Ya sea que esté organizando un retiro de bienestar corporativo, un evento privado o un evento de bienestar grupal en Mallorca, Ibiza o en toda España que se adapte a sus necesidades. Nuestros terapeutas expertos tienen licencia, seguro y han sido examinados minuciosamente para garantizar los más altos estándares de atención y profesionalismo.",
    sport_event: "Eventos deportivos",
    sport_event_content:
      "Yuhu ofrece asistencia para eventos deportivos sin estrés en Mallorca, Ibiza y España. Nuestros servicios móviles de bienestar, que incluyen masajes y entrenamiento personal, garantizan que los atletas se recuperen y rindan al máximo.",
    wedding: "Bodas",
    wedding_event:
      "Haz que tu boda en Mallorca, Ibiza o España sea inolvidable con los servicios de bienestar móviles de Yuhu. Desde los cuidados previos a la boda hasta la recuperación posterior al evento, garantizamos la relajación para ti y tus invitados.",
    charity_event: "Eventos de caridad",
    charity_event_content:
      "Realza tu evento benéfico en Mallorca, Ibiza o España con Yuhu Wellness. Ofrecemos tratamientos antiestrés para organizadores, participantes y voluntarios, creando un ambiente tranquilo y centrado.",
    retreat: "Retiros",
    retreat_event:
      "Yuhu ofrece experiencias de bienestar personalizadas para retiros en Mallorca, Ibiza y España. Desde masajes hasta terapias de relajación, ayudamos a crear escapadas inolvidables y reparadoras.",
    employee_wellness: "Bienestar del empleado",
    employee_wellness_content:
      "Yuhu Wellness lleva servicios de bienestar móviles a Mallorca, Ibiza y España, reduciendo el estrés en el lugar de trabajo y aumentando la productividad con masajes antiestrés y sesiones de fitness.",
    incentive: "Incentivos",
    incentive_content:
      "Premia a tu equipo con los masajes y tratamientos móviles de Yuhu Wellness en Mallorca, Ibiza y España, motivándolos con una experiencia rejuvenecedora y memorable.",
    client_hospitally: "Hospitalidad del cliente",
    client_hospitally_content:
      "Impresione a sus clientes con los lujosos masajes y tratamientos de Yuhu Wellness en Mallorca, Ibiza y España, creando experiencias de hospitalidad relajantes y memorables.",
    massage_gun: "Pistola de masaje",
    massage_gun_content:
      "Relaja y alivia la tensión muscular. Perfecto para la recuperación después del entrenamiento o para el alivio muscular diario, proporciona vibraciones potentes y relajantes para tratar los puntos tensos y promover la relajación.",
    oils: "Aceites",
    oils_content:
      "Nuestros aceites están diseñados para nutrir e hidratar tu piel y, al mismo tiempo, brindar una experiencia relajante y calmante. Son ideales para masajes o rutinas diarias de cuidado personal y te dejarán con una sensación de relajación y rejuvenecimiento.",
    super_patch: "Súper parche",
    super_patch_content:
      "Es una solución potente y fácil de usar para una recuperación muscular rápida. Simplemente aplíquelo en las zonas doloridas o tensas para experimentar un alivio específico, lo que le ayudará a volver a su rutina más rápido y con menos molestias.",
    massage_candle: "Velas de masaje",
    massage_candle_content:
      "Una vez derretida, la cera se transforma en un aceite de masaje cálido y lujoso que hidrata profundamente la piel mientras calma el cuerpo y la mente con una fragancia relajante.",
    event_mobile_massage_title:
      "Masaje a domicilio en España e Italia: bienestar de lujo, en cualquier momento y en cualquier lugar",
    event_mobile_massage_subtitle:
      "Masajes y tratamientos de belleza expertos entregados a su puerta",
    event_mobile_massage_content:
      "¿Buscas la mejor experiencia de relajación en España e Italia? Yuhu Wellness ofrece servicios de masajes móviles de primera calidad, con terapeutas profesionales que acuden directamente a tu casa, hotel, yate o lugar de trabajo. Ya sea que necesites un masaje localizado, un masaje relajante, una pedicura, una manicura o un tratamiento facial, nuestro equipo de expertos te garantiza una experiencia de bienestar personalizada dondequiera que estés.",
    meet_team: "Conozca al equipo",
    meet_team_content:
      "Todos nuestros masajistas profesionales cuentan con licencia completa, están asegurados y han sido rigurosamente examinados a través de nuestros protocolos de seguridad líderes en la industria. Cuando reservas un servicio de Yuhu Wellness, ya sea un masaje relajante, un masaje deportivo, un entrenamiento personal o nuestras sesiones de tratamiento de belleza, recibirás una confirmación con el nombre completo de tu masajista, una biografía profesional y detalles sobre su experiencia, lo que garantiza transparencia y confianza. Nos comprometemos a brindar el más alto nivel de comodidad y seguridad.",
  },
  it: {
    contactUs: "CONTATTACI",
    contactUsDescription:
      "Non esitare - contattaci subito per maggiori informazioni o per un preventivo non vincolante per i nostri servizi di massaggi e benessere. Sia che tu stia organizzando un evento a Maiorca, Ibiza o in qualsiasi altra parte della Spagna, siamo qui per aiutarti!",
    name: "Nome",
    email: "Email",
    phoneNumber: "Numero di telefono",
    message: "Messaggio",
    submit: "Invia",
    phone: "Telefono",
    treatments: "Trattamenti",
    categories: "Categorie",
    giftCards: "Buoni regalo",
    bookNow: "Prenota ora",
    company: "Azienda",
    contact_us_content:
      "Non esitare a contattarci ora per ulteriori informazioni o un preventivo senza impegno per i nostri servizi di massaggio e benessere. Che tu stia organizzando un evento a Mallorca, Ibiza o in qualsiasi altra parte della Spagna, siamo qui per aiutarti!",
    events: "Eventi",
    event_title:
      "Esperienze di benessere su misura a Maiorca, Ibiza e in tutta la Spagna",
    event_content:
      "Siamo specializzati nella creazione di eventi benessere unici che portano relax e ringiovanimento direttamente a te. Che tu stia organizzando un ritiro benessere aziendale, un evento privato o un benessere di gruppo a Maiorca, Ibiza o in tutta la Spagna per soddisfare le tue esigenze. I nostri terapisti esperti sono autorizzati, assicurati e attentamente selezionati per garantire i più alti standard di cura e professionalità.",
    sport_event: "Eventi sportivi",
    sport_event_content:
      "Yuhu offre supporto per eventi sportivi senza stress a Maiorca, Ibiza e in Spagna. I nostri servizi di benessere mobile, tra cui massaggi e personal training, assicurano agli atleti il ​​recupero e le prestazioni migliori.",
    wedding: "Matrimoni",
    wedding_event:
      "Rendi indimenticabile il tuo matrimonio a Maiorca, Ibiza o in Spagna con i servizi di benessere mobile di Yuhu. Dalle coccole pre-matrimonio al recupero post-evento, garantiamo relax per te e i tuoi ospiti.",
    charity_event: "Eventi di beneficenza",
    charity_event_content:
      "Migliora il tuo evento di beneficenza a Maiorca, Ibiza o in Spagna con Yuhu Wellness. Offriamo trattamenti antistress per organizzatori, partecipanti e volontari, creando un'atmosfera calma e concentrata.",
    retreat: "Ritiri",
    retreat_event:
      "Yuhu offre esperienze di benessere personalizzate per ritiri a Maiorca, Ibiza e in Spagna. Dai massaggi alle terapie di rilassamento, aiutiamo a creare fughe indimenticabili e rigeneranti.",
    employee_wellness: "Benessere dei dipendenti",
    employee_wellness_content:
      "Yuhu Wellness porta i suoi servizi di benessere mobile a Maiorca, Ibiza e in Spagna, riducendo lo stress sul posto di lavoro e aumentando la produttività con massaggi antistress e sessioni di fitness.",
    incentive: "Incentivi",
    incentive_content:
      "Premia il tuo team con i massaggi e i trattamenti mobili di Yuhu Wellness a Maiorca, Ibiza e in Spagna, motivandoli con un'esperienza rigenerante e memorabile.",
    client_hospitally: "Ospitalità del cliente",
    client_hospitally_content:
      "Stupisci i tuoi clienti con i lussuosi massaggi e trattamenti di Yuhu Wellness a Maiorca, Ibiza e in tutta la Spagna, creando esperienze di ospitalità rilassanti e memorabili.",
    massage_gun: "Pistola per massaggi",
    massage_gun_content:
      "Rilassa e allevia la tensione muscolare. Perfetto per il recupero post-allenamento o per il sollievo muscolare quotidiano, fornisce vibrazioni potenti e rilassanti per colpire i punti tesi e favorire il rilassamento.",
    oils: "Oli",
    oils_content:
      "I nostri oli sono progettati per nutrire e idratare la pelle, offrendo al contempo un'esperienza calmante e lenitiva. Ideali per massaggi o routine quotidiane di cura di sé, ti lasciano rilassato e ringiovanito.",
    super_patch: "Super Toppa",
    super_patch_content:
      "È una soluzione potente e facile da usare per un rapido recupero muscolare. Basta applicarlo sulle aree doloranti o contratte per provare un sollievo mirato, aiutandoti a tornare alla tua routine più velocemente e con meno disagio.",
    massage_candle: "Candele da massaggio",
    massage_candle_content:
      "Una volta sciolta, la cera si trasforma in un caldo e lussuoso olio da massaggio che idrata in profondità la pelle, lenendo corpo e mente con una fragranza rilassante.",
    event_mobile_massage_title:
      "Massaggio Mobile in Spagna e Italia – Benessere di Lusso, Sempre e Ovunque",
    event_mobile_massage_subtitle:
      "Trattamenti di Massaggio e Bellezza Esperti Consegnati a Domicilio",
    event_mobile_massage_content:
      "Cerchi l'esperienza di relax definitiva in Spagna e Italia? Yuhu Wellness offre servizi di massaggio mobile premium, portando terapeuti professionisti direttamente a casa tua, in hotel, in yacht o sul posto di lavoro. Che tu abbia bisogno di un massaggio localizzato, un massaggio rilassante, una pedicure, una manicure o un trattamento viso, il nostro team di esperti garantisce un'esperienza di benessere personalizzata ovunque tu sia.",
    meet_team: "Incontra il team",
    meet_team_content:
      "Tutti i nostri massaggiatori professionisti sono completamente autorizzati, assicurati e rigorosamente controllati tramite i nostri protocolli di sicurezza leader del settore. Quando prenoti un servizio Yuhu Wellness, che si tratti di un massaggio rilassante, sportivo, di un personal training o delle nostre sessioni di trattamento di bellezza, riceverai una conferma con il nome completo del tuo terapista, la biografia professionale e i dettagli sulla sua competenza, garantendo trasparenza e fiducia. Ci impegniamo a fornire il massimo livello di comfort e sicurezza.",
  },
};

export default translations;
