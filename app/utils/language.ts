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
    home: "Home",
    our_services: "Our Services",
    therapist: "Therapist",
    join_the_team: "Join the team",
    store: "Store",
    spain: "Spain",
    italy: "Italy",
    legal: "Legal",
    privacy_policy: "Privacy Policy",
    cookies_policy: "Cookies Policy",
    imprint: "Imprint",
    terms_service: "Terms of Service",
    health_advisor: "AI Health Advisor",
    footer_content: "2024 Yuhu All Rights Reserved.",
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
    home_choose_wellness: "Why Choose Yuhu Wellness?",
    home_choose_wellness_content_1:
      "Why Choose Us? With our on-demand, mobile massage services in Mallorca, Ibiza and Spain, you save time and enjoy a premium spa experience in the comfort of your chosen location. Whether you're relaxing after a long day exploring Mallorca or celebrating a special event, we're here to ensure your complete relaxation.",
    home_choose_wellness_content_2:
      "Convenient & Time-saving: book our mobile massage or beauty treatment at a time that suits you. No need to worry about driving, parking, or babysitters-stay in the comfort of your space.",
    home_choose_wellness_content_3:
      "Tailored Services: Our skilled professionals offer personalized treatments across Mallorca, including sports recovery, pain relief, and relaxation massages.",
    home_choose_wellness_content_4:
      "Spa Quality at Home: Enjoy premium wellness services without the hassle of traveling to a spa.",
    home_how_works: "How it works?",
    home_how_works_content_1:
      "Choose your wellness service. Select from a variety of massage and beauty treatments.",
    home_how_works_content_2:
      "Set your location and preferred time. Whether it's your home, villa, or hotel.",
    home_how_works_content_3:
      "Book instantly-enjoy same-day availability or schedule in advance.",
    home_how_works_content_4:
      "Yuhu Wellness and Massage makes it simple to access luxury wellness services at affordable prices. Experience the convenience of on-demand mobile wellness services, whether you are in Mallorca Ibiza, or another Spanish city, our team is ready to deliver relaxation and rejuvenation.",
    home_hero_title_1: "Premium Massage & Wellness Services",
    home_hero_title_2: "Anytime, Anywhere in Italy & Spain",
    home_hero_title_content:
      "Rejuvenate your mind and body with expert massage therapy and wellness experiences tailored to your needs. Whether you're seeking a relaxing massage, sports massage massage, or a spa day at home ,our top massage therapists in Spain and Italy bring wellness directly to you—on your schedule, wherever you are.",
    about_us: "About Us",
    about_us_content:
      "At Yuhu Wellness, we believe in bringing wellness and fitness directly to you. As a leading provider of mobile massage and personal training services, we deliver tailored experiences across Mallorca, Ibiza, the Balearic Islands, Rome, Milan, and Italy. With a team of certified professionals, we ensure personalized care in the comfort of your home, office, or event.",
    our_mission: "Our Mission",
    our_mission_content:
      "Our mission is to make wellness accessible, convenient, and personalized. By combining expert care, flexibility, and on-demand services, we empower individuals to prioritize their health and well-being. Whether you seek relaxation, recovery, or fitness improvement, Yuhu Wellness is here to help.",
    our_vision: "Our Vision",
    our_vision_content:
      "We envision a world where wellness is a lifestyle, not a luxury. At Yuhu Wellness, we strive to revolutionize the way people approach self-care by creating seamless, accessible, and stress-free experiences across Spain and Italy.",
    what_we_do: "What We Do?",
    we_offer: "We offer",
    we_offer_content_1: "Massages: therapeutic, relaxing, and sports.",
    we_offer_content_2: "Beauty treatments (Facials, Manicure, pedicure, etc)",
    we_offer_content_3: "Personal training programs customized to your goals.",
    about_how_it_works: "How It Works",
    about_how_it_works_content_1:
      "Simply select what you need, your favorite therapist (upon availability) along with the time and place.",
    about_how_it_works_content_2:
      "Make your payment and We will deliver the service directly to you.",
    about_who_where_servce: "Who and Where We Serve",
    about_who_where_servce_content_1: "We cater to:",
    about_who_where_servce_content_2:
      "Private clients, Corporate events, Retreats and more.",
    about_who_where_servce_content_3:
      "Locations include: Mallorca, Ibiza, Spain Rome, Milan, and across Italy",
    about_who_where_servce_content_4:
      "Wherever you are, we bring wellness to you.",
    signin: "Sign In",
    signup: "Sign Up",
    welcome_back: "Welcome back",
    welcome_back_content: "We are happy to have you back",
    password: "Password",
    forgot_password: "Forgot Password",
    login: "Login",
    or: "Or",
    auth_content_1: "Relax, Quick and Smooth",
    auth_content_2:
      "Your gateway to relaxation and rejuvenation. Log in to unwind, refresh, and feel your best.",
    signup_with_us: "Sign up with us",
    ready_have_account: "Already have an account?",
    full_name: "Full Name",
    enter_full_name: "Enter your full name",
    create_account: "Create Account",
    new_password: "New Password",
    confirm_password: "Confirm Password",
    reset_password: "Reset Password",
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
    home: "Inicio",
    our_services: "Nuestros servicios",
    therapist: "Terapeuta",
    join_the_team: "Únete al equipo",
    store: "Tienda",
    spain: "España",
    italy: "Italia",
    legal: "Legal",
    privacy_policy: "Política de privacidad",
    cookies_policy: "Política de cookies",
    imprint: "Aviso legal",
    terms_service: "Condiciones del servicio",
    health_advisor: "AI Health Advisor",
    footer_content: "2024 Yuhu Todos los derechos reservados.",
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
    home_choose_wellness: "¿Por qué elegir Yuhu Wellness?",
    home_choose_wellness_content_1:
      "¿Por qué elegirnos? Con nuestros servicios de masajes móviles bajo demanda en Mallorca, Ibiza y España, ahorras tiempo y disfrutas de una experiencia spa premium en la comodidad de tu ubicación elegida. Ya sea que te estés relajando después de un largo día explorando Mallorca o celebrando un evento especial, estamos aquí para garantizar tu completa relajación.",
    home_choose_wellness_content_2:
      "Conveniente y Ahorra Tiempo: reserva nuestro masaje móvil o tratamiento de belleza en el momento que mejor te convenga. No hay necesidad de preocuparse por conducir, estacionar o niñeras - quédate en la comodidad de tu espacio.",
    home_choose_wellness_content_3:
      "Servicios Personalizados: Nuestros profesionales capacitados ofrecen tratamientos personalizados en toda Mallorca, incluyendo recuperación deportiva, alivio del dolor y masajes de relajación.",
    home_choose_wellness_content_4:
      "Calidad de Spa en Casa: Disfruta de servicios de bienestar premium sin la molestia de viajar a un spa.",
    home_how_works: "¿Cómo funciona?",
    home_how_works_content_1:
      "Elige tu servicio de bienestar. Selecciona entre una variedad de masajes y tratamientos de belleza.",
    home_how_works_content_2:
      "Configura tu ubicación y el horario preferido. Ya sea en tu casa, villa u hotel.",
    home_how_works_content_3:
      "Reserva al instante: disfruta de disponibilidad el mismo día o programa con anticipación.",
    home_how_works_content_4:
      "Yuhu Wellness and Massage hace que sea fácil acceder a servicios de bienestar de lujo a precios accesibles. Experimenta la comodidad de los servicios móviles de bienestar bajo demanda, ya sea que estés en Mallorca, Ibiza u otra ciudad española, nuestro equipo está listo para brindarte relajación y rejuvenecimiento.",
    home_hero_title_1: "Servicios Premium de Masajes y Bienestar",
    home_hero_title_2: "En cualquier momento y lugar en Italia y España",
    home_hero_title_content:
      "Rejuvenece tu mente y cuerpo con terapias de masajes y experiencias de bienestar adaptadas a tus necesidades. Ya sea que busques un masaje relajante, un masaje deportivo o un día de spa en casa, nuestros mejores masajistas en España e Italia llevan el bienestar directamente a ti, en tu horario, dondequiera que estés.",
    about_us: "Sobre Nosotros",
    about_us_content:
      "En Yuhu Wellness, creemos en llevar el bienestar y la salud directamente a ti. Como líder en servicios de masajes móviles y entrenamiento personal, ofrecemos experiencias personalizadas en Mallorca, Ibiza, las Islas Baleares, Roma, Milán y toda Italia. Con un equipo de profesionales certificados, garantizamos atención personalizada en la comodidad de tu hogar, oficina o evento.",
    our_mission: "Nuestra Misión",
    our_mission_content:
      "Nuestra misión es hacer que el bienestar sea accesible, conveniente y personalizado. Combinando atención experta, flexibilidad y servicios bajo demanda, ayudamos a las personas a priorizar su salud y bienestar. Ya sea que busques relajación, recuperación o mejora física, Yuhu Wellness está aquí para ayudarte.",
    our_vision: "Nuestra Visión",
    our_vision_content:
      "Imaginamos un mundo donde el bienestar sea un estilo de vida, no un lujo. En Yuhu Wellness, nos esforzamos por revolucionar la forma en que las personas abordan el autocuidado creando experiencias fluidas, accesibles y sin estrés en toda España e Italia.",
    what_we_do: "¿Qué Hacemos?",
    we_offer: "Lo que Ofrecemos",
    we_offer_content_1: "Masajes: terapéuticos, relajantes y deportivos.",
    we_offer_content_2:
      "Tratamientos de belleza (faciales, manicura, pedicura, etc.)",
    we_offer_content_3:
      "y programas de entrenamiento personal adaptados a tus objetivos.",
    about_how_it_works: "Cómo Funciona",
    about_how_it_works_content_1:
      "Simplemente selecciona lo que necesitas, tu terapeuta favorito (según disponibilidad) junto con la hora y el lugar.",
    about_how_it_works_content_2:
      "Realiza tu pago y nosotros llevaremos el servicio directamente a ti.",
    about_who_where_servce: "A Quién y Dónde Servimos",
    about_who_where_servce_content_1: "Atendemos a:",
    about_who_where_servce_content_2:
      "Clientes privados, eventos corporativos, retiros y más.",
    about_who_where_servce_content_3:
      "Ubicaciones incluyen: Mallorca, Ibiza, España, Roma, Milán y toda Italia.",
    about_who_where_servce_content_4:
      "Dondequiera que estés, llevamos el bienestar a ti.",
    signin: "Iniciar sesión",
    signup: "Registrarse",
    welcome_back: "Bienvenido de nuevo",
    welcome_back_content: "Nos alegra tenerte de nuevo",
    password: "Contraseña",
    forgot_password: "Olvidé mi contraseña",
    login: "Iniciar sesión",
    or: "O",
    auth_content_1: "Relájate, rápido y sin complicaciones",
    auth_content_2:
      "Tu puerta de entrada a la relajación y el rejuvenecimiento. Inicia sesión para relajarte, refrescarte y sentirte lo mejor posible",
    signup_with_us: "Regístrate con nosotros",
    ready_have_account: "¿Ya tienes una cuenta?",
    full_name: "Nombre completo",
    enter_full_name: "Ingresa tu nombre completo",
    create_account: "Crear cuenta",
    new_password: "Nueva contraseña",
    confirm_password: "Confirmar contraseña",
    reset_password: "Restablecer contraseña",
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
    home: "Home",
    our_services: "I nostri servizi",
    therapist: "Terapista",
    join_the_team: "Unisciti al team",
    store: "Negozio",
    spain: "Spagna",
    italy: "Italia",
    legal: "Legale",
    privacy_policy: "Informativa sulla privacy",
    cookies_policy: "Informativa sui cookie",
    imprint: "Impressum",
    terms_service: "Termini di servizio",
    health_advisor: "AI Health Advisor",
    footer_content: "2024 Yuhu Tutti i diritti riservati.",
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
    home_choose_wellness: "Perché scegliere Yuhu Wellness?",
    home_choose_wellness_content_1:
      "Perché scegliere noi? Con i nostri servizi di massaggi mobili su richiesta a Maiorca, Ibiza e in Spagna, risparmi tempo e godi di un'esperienza spa premium nel comfort della tua posizione scelta. Che tu stia rilassandoti dopo una lunga giornata esplorando Maiorca o celebrando un evento speciale, siamo qui per garantire il tuo totale relax.",
    home_choose_wellness_content_2:
      "Comodo e Salva-tempo: prenota il nostro massaggio mobile o trattamento di bellezza in un momento che ti è comodo. Non c'è bisogno di preoccuparsi di guidare, parcheggiare o trovare una babysitter - rimani nel comfort del tuo spazio.",
    home_choose_wellness_content_3:
      "Servizi Personalizzati: I nostri professionisti qualificati offrono trattamenti personalizzati in tutta Maiorca, tra cui recupero sportivo, sollievo dal dolore e massaggi rilassanti.",
    home_choose_wellness_content_4:
      "Qualità Spa a Casa: Goditi servizi di benessere premium senza il fastidio di dover andare in una spa.",
    home_how_works: "Come funziona?",
    home_how_works_content_1:
      "Scegli il tuo servizio di benessere. Seleziona tra una varietà di massaggi e trattamenti di bellezza.",
    home_how_works_content_2:
      "Imposta la tua posizione e il tuo orario preferito. Che sia a casa tua, in villa o in hotel.",
    home_how_works_content_3:
      "Prenota istantaneamente - goditi la disponibilità per lo stesso giorno o programma in anticipo.",
    home_how_works_content_4:
      "Yuhu Wellness e Massage rende semplice accedere a servizi di benessere di lusso a prezzi accessibili. Sperimenta la comodità dei servizi di benessere mobili su richiesta, che tu sia a Maiorca, Ibiza o in un'altra città spagnola, il nostro team è pronto a offrirti relax e ringiovanimento.",
    home_hero_title_1: "Servizi Premium di Massaggi e Benessere",
    home_hero_title_2: "Sempre e Ovunque in Italia e Spagna",
    home_hero_title_content:
      "Ringiovanisci la tua mente e il tuo corpo con esperienze di massoterapia e benessere esperte, su misura per le tue esigenze. Che tu stia cercando un massaggio rilassante, un massaggio sportivo o una giornata spa a casa, i nostri migliori massaggiatori in Spagna e Italia portano il benessere direttamente da te, nel momento che preferisci, ovunque tu sia.",
    about_us: "Chi Siamo",
    about_us_content:
      "In Yuhu Wellness, crediamo nel portare il benessere e il fitness direttamente a te. Come leader nei servizi di massaggi mobili e personal training, offriamo esperienze su misura a Maiorca, Ibiza, le Isole Baleari, Roma, Milano e in tutta Italia. Con un team di professionisti certificati, garantiamo cure personalizzate nel comfort della tua casa, ufficio o evento.",
    our_mission: "La Nostra Missione",
    our_mission_content:
      "La nostra missione è rendere il benessere accessibile, conveniente e personalizzato. Combinando cure esperte, flessibilità e servizi su richiesta, aiutiamo le persone a dare priorità alla loro salute e al loro benessere. Che tu cerchi relax, recupero o miglioramento fisico, Yuhu Wellness è qui per aiutarti.",
    our_vision: "La Nostra Visione",
    our_vision_content:
      "Immaginiamo un mondo in cui il benessere è uno stile di vita, non un lusso. In Yuhu Wellness, ci impegniamo a rivoluzionare il modo in cui le persone affrontano la cura di sé creando esperienze fluide, accessibili e prive di stress in tutta la Spagna e l'Italia.",
    what_we_do: "Cosa Facciamo?",
    we_offer: "Cosa Offriamo",
    we_offer_content_1: "Massaggi: terapeutici, rilassanti e sportivi.",
    we_offer_content_2:
      "Trattamenti di bellezza (trattamenti viso, manicure, pedicure, ecc.)",
    we_offer_content_3:
      "e programmi di personal training personalizzati ai tuoi obiettivi.",
    about_how_it_works: "Come Funziona",
    about_how_it_works_content_1:
      "Basta selezionare ciò di cui hai bisogno, il tuo terapeuta preferito (se disponibile) insieme al momento e al luogo.",
    about_how_it_works_content_2:
      "Effettua il pagamento e noi ti consegneremo il servizio direttamente.",
    about_who_where_servce: "Chi e Dove Serviamo",
    about_who_where_servce_content_1: "Ci rivolgiamo a:",
    about_who_where_servce_content_2:
      "Clienti privati, eventi aziendali, ritiri e altro.",
    about_who_where_servce_content_3:
      "Le località includono: Maiorca, Ibiza, Spagna, Roma, Milano e tutta l'Italia.",
    about_who_where_servce_content_4:
      "Ovunque tu sia, portiamo il benessere da te.",
    signin: "Accedi",
    signup: "Registrati",
    welcome_back: "Bentornato",
    welcome_back_content: "Siamo felici di riaverti",
    password: "Password",
    forgot_password: "Password dimenticata",
    login: "Accedi",
    or: "Oppure",
    auth_content_1: "Rilassati, veloce e fluido",
    auth_content_2:
      "Il tuo gateway per il relax e il ringiovanimento. Accedi per rilassarti, rinfrescarti e sentirti al meglio.",
    signup_with_us: "Registrati con noi",
    ready_have_account: "Hai già un account?",
    full_name: "Nome completo",
    enter_full_name: "Inserisci il tuo nome completo",
    create_account: "Crea un account",
    new_password: "Nuova password",
    confirm_password: "Conferma password",
    reset_password: "Reimposta password",
  },
};

export default translations;
