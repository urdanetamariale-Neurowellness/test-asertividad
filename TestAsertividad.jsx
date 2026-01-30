import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

const TestAsertividad = () => {
  const [stage, setStage] = useState('intro');
  const [userData, setUserData] = useState({ nombre: '', email: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  // IMPORTANTE: Reemplaza esta URL con tu Google Apps Script Web App URL
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxAIy-I_rProZ7dwAkUD9EQ597CwZwOX_LQfJOFW7WjrSsikyEs68dTiCN4l6KsT8Lk/exec';

  const LOGO_BASE64 = 'https://urdanetamariale-neurowellness.github.io/test-asertividad-neurowellness/main/assets/logo.png';

  const questions = [
    {
      id: 1,
      text: "Un amigo te pide prestado dinero por tercera vez este mes y aún no te ha devuelto lo anterior:",
      options: [
        { id: 'a', text: "Le presto el dinero aunque me incomoda, total luego me pagará todo junto", type: 'PC' },
        { id: 'b', text: "Le digo que 'ahorita ando corto' o 'déjame ver', evitando decirle directamente que no", type: 'PE' },
        { id: 'c', text: "Le digo que no puedo prestarle más hasta que salde lo anterior, y le ofrezco ayudarle a buscar otras alternativas", type: 'A' },
        { id: 'd', text: "Le digo que no de forma cortante y le suelto '¿otra vez? ¡siempre es lo mismo contigo!'", type: 'AI' },
        { id: 'e', text: "Le explico que tengo mis propias prioridades financieras y que necesita organizarse mejor", type: 'AD' },
        { id: 'f', text: "Le digo que sí pero luego evito sus llamadas o le digo que 'se me olvidó' ir al banco", type: 'PA' }
      ],
      dimension: "Peticiones y necesidades"
    },
    {
      id: 2,
      text: "En un restaurante tu plato llega frío y no es exactamente lo que pediste:",
      options: [
        { id: 'a', text: "Me lo como sin decir nada, total no es tan grave y no quiero causar problemas", type: 'PC' },
        { id: 'b', text: "Como un poco y dejo el resto, si el mesero pregunta digo que 'ya estoy lleno' o que 'está bien'", type: 'PE' },
        { id: 'c', text: "Llamo al mesero, explico la situación amablemente y pido que por favor lo solucionen", type: 'A' },
        { id: 'd', text: "Llamo al mesero con tono molesto diciéndole '¿en serio? ¡esto está frío y ni siquiera es lo que pedí!'", type: 'AI' },
        { id: 'e', text: "Señalo el error de manera directa, indico que esto no cumple con lo que pedí y espero que lo corrijan inmediatamente", type: 'AD' },
        { id: 'f', text: "No digo nada en el momento pero dejo propina mínima o escribo una mala reseña después", type: 'PA' }
      ],
      dimension: "Peticiones y necesidades"
    },
    {
      id: 3,
      text: "Un compañero de trabajo te pide constantemente ayuda con tareas que debería saber hacer:",
      options: [
        { id: 'a', text: "Siempre le ayudo aunque me atrase en mi propio trabajo, no quiero que piense que soy mala persona", type: 'PC' },
        { id: 'b', text: "Le digo que 'ahorita estoy ocupado' o que 'luego lo vemos', tratando de evitar ayudarle sin decirle que no", type: 'PE' },
        { id: 'c', text: "Le ayudo esta vez pero le sugiero recursos o capacitación para que aprenda a hacerlo solo", type: 'A' },
        { id: 'd', text: "Le digo de forma cortante '¡ya deberías saber hacer esto! No puedo estar ayudándote siempre'", type: 'AI' },
        { id: 'e', text: "Le explico que tengo mis propias responsabilidades y que necesita desarrollar autonomía en estas tareas", type: 'AD' },
        { id: 'f', text: "Le ayudo pero haciendo comentarios indirectos sobre su falta de capacidad o suspirando audiblemente", type: 'PA' }
      ],
      dimension: "Peticiones y necesidades"
    },
    {
      id: 4,
      text: "Tu pareja/familiar cercano hace un comentario sarcástico sobre algo que es importante para ti delante de otras personas:",
      options: [
        { id: 'a', text: "Me río junto con los demás aunque me duele, no quiero arruinar el momento", type: 'PC' },
        { id: 'b', text: "Cambio de tema rápidamente o me quedo callado, esperando que pase el momento", type: 'PE' },
        { id: 'c', text: "En privado le comento que ese comentario me molestó y me gustaría que no se repita", type: 'A' },
        { id: 'd', text: "Le respondo con otro comentario sarcástico sobre algo suyo en el momento para que vea cómo se siente", type: 'AI' },
        { id: 'e', text: "Le hago saber ahí mismo que ese tipo de comentarios no son apropiados, independientemente de quién esté presente", type: 'AD' },
        { id: 'f', text: "No digo nada pero me muestro distante y frío el resto del día para que se dé cuenta", type: 'PA' }
      ],
      dimension: "Manejo de conflictos"
    },
    {
      id: 5,
      text: "Un compañero se adjudica en una reunión una idea que tú propusiste semanas atrás:",
      options: [
        { id: 'a', text: "No digo nada, quizás ni siquiera se acordaba que era mía, no vale la pena el conflicto", type: 'PC' },
        { id: 'b', text: "Después le mando un mensaje o correo 'recordándole' que habíamos hablado de eso antes", type: 'PE' },
        { id: 'c', text: "Intervengo: 'Exacto, esa fue la propuesta que hice en la reunión del [fecha]. Me parece bien que la retomemos'", type: 'A' },
        { id: 'd', text: "Lo interrumpo diciéndole '¡espera! Esa idea la propuse yo hace semanas, no te la adjudiques'", type: 'AI' },
        { id: 'e', text: "Aclaro para el grupo que yo presenté esa propuesta anteriormente y que es importante reconocer las contribuciones", type: 'AD' },
        { id: 'f', text: "No digo nada en la reunión pero después dejo de compartir ideas con él o hago comentarios con otros", type: 'PA' }
      ],
      dimension: "Manejo de conflictos"
    },
    {
      id: 6,
      text: "Alguien tiene una opinión política/social muy diferente a la tuya y la expresa con convicción:",
      options: [
        { id: 'a', text: "Asiento y sigo la corriente aunque esté en total desacuerdo internamente", type: 'PC' },
        { id: 'b', text: "Cambio de tema diciendo algo como 'ay sí, quién sabe' sin comprometerme", type: 'PE' },
        { id: 'c', text: "Comparto mi perspectiva diferente reconociendo que son temas donde las personas pueden diferir", type: 'A' },
        { id: 'd', text: "Salto a debatir inmediatamente tratando de demostrar por qué está equivocado", type: 'AI' },
        { id: 'e', text: "Expongo mi punto de vista con firmeza, dejando claro que esa postura me parece problemática", type: 'AD' },
        { id: 'f', text: "Asiento pero luego hago comentarios sarcásticos o me burlo de esas ideas con otros", type: 'PA' }
      ],
      dimension: "Manejo de conflictos"
    },
    {
      id: 7,
      text: "Tu jefe te envía mensajes de trabajo fuera de horario laboral con frecuencia:",
      options: [
        { id: 'a', text: "Respondo inmediatamente siempre, aunque esté cenando o con mi familia", type: 'PC' },
        { id: 'b', text: "Los veo pero no respondo, o respondo al día siguiente sin decir nada sobre el horario", type: 'PE' },
        { id: 'c', text: "Respondo: 'Lo reviso mañana primera hora' o propongo establecer horarios para temas urgentes", type: 'A' },
        { id: 'd', text: "Le respondo '¡estoy fuera de horario!' o lo dejo en visto mostrando mi molestia", type: 'AI' },
        { id: 'e', text: "Le explico que fuera de horario no estoy disponible a menos que sea una emergencia real", type: 'AD' },
        { id: 'f', text: "Respondo pero con respuestas cortas, tardías o poco útiles para que 'capte' que no me parece", type: 'PA' }
      ],
      dimension: "Establecimiento de límites"
    },
    {
      id: 8,
      text: "Un vecino pone música alta repetidamente en horarios de descanso:",
      options: [
        { id: 'a', text: "No digo nada y uso tapones para dormir, no quiero problemas con vecinos", type: 'PC' },
        { id: 'b', text: "Hago ruido también o toco la pared esperando que entienda, pero no hablo con él", type: 'PE' },
        { id: 'c', text: "Toco su puerta y le explico amablemente que el ruido me afecta, buscando llegar a un acuerdo", type: 'A' },
        { id: 'd', text: "Golpeo la pared fuerte, pongo música también alta o le grito que baje el volumen", type: 'AI' },
        { id: 'e', text: "Voy y le informo directamente que debe respetar los horarios de descanso, es una norma de convivencia", type: 'AD' },
        { id: 'f', text: "No le digo nada pero hago comentarios pasivos en el elevador sobre 'gente sin educación'", type: 'PA' }
      ],
      dimension: "Establecimiento de límites"
    },
    {
      id: 9,
      text: "En una reunión familiar/de amigos proponen un plan que realmente no te interesa o no puedes asistir:",
      options: [
        { id: 'a', text: "Digo que sí aunque no quiera ir, y luego voy aunque esté incómodo todo el tiempo", type: 'PC' },
        { id: 'b', text: "Digo 'tal vez' o 'lo veo' sabiendo que no iré, para no quedar mal en el momento", type: 'PE' },
        { id: 'c', text: "Agradezco la invitación y explico honestamente que prefiero no asistir o tengo otros compromisos", type: 'A' },
        { id: 'd', text: "Digo '¿en serio quieren ir a eso? Qué aburrido' o critico el plan abiertamente", type: 'AI' },
        { id: 'e', text: "Explico que tengo otras prioridades y que no todos los planes tienen que incluirme", type: 'AD' },
        { id: 'f', text: "Digo que sí pero luego cancelo de último momento poniendo una excusa", type: 'PA' }
      ],
      dimension: "Expresión de desacuerdo"
    },
    {
      id: 10,
      text: "Un amigo te recomienda insistentemente una película/serie/libro que a ti no te gustó:",
      options: [
        { id: 'a', text: "Le digo que sí me gustó para no contradecirlo ni hacerlo sentir mal", type: 'PC' },
        { id: 'b', text: "Digo algo vago como 'interesante' o 'diferente' sin dar mi opinión real", type: 'PE' },
        { id: 'c', text: "Le digo 'no fue mi tipo de género, pero entiendo por qué te gustó a ti'", type: 'A' },
        { id: 'd', text: "Le digo '¿en serio te gustó? ¡Estuvo malísima!' y explico todo lo que estuvo mal", type: 'AI' },
        { id: 'e', text: "Le explico objetivamente por qué no cumplió mis expectativas o criterios", type: 'AD' },
        { id: 'f', text: "Le digo que sí pero luego hago comentarios sarcásticos sobre su recomendación", type: 'PA' }
      ],
      dimension: "Expresión de desacuerdo"
    },
    {
      id: 11,
      text: "Tu jefe/profesor te da feedback negativo sobre tu trabajo frente a otros:",
      options: [
        { id: 'a', text: "Acepto todo sin decir nada y me disculpo, aunque sienta que algunas críticas son injustas", type: 'PC' },
        { id: 'b', text: "Asiento y digo que lo revisaré, pero después evito el tema si vuelve a surgir", type: 'PE' },
        { id: 'c', text: "Escucho, acepto lo válido y pido respetuosamente hablar en privado sobre puntos que necesitan contexto", type: 'A' },
        { id: 'd', text: "Me defiendo inmediatamente: '¡Pero es que no tuve los recursos!' o menciono sus errores también", type: 'AI' },
        { id: 'e', text: "Explico de forma firme los factores y decisiones que tomé, dejando claro que tenía mis razones", type: 'AD' },
        { id: 'f', text: "Acepto con un 'tienes razón' pero luego hago comentarios sarcásticos sobre él con otros", type: 'PA' }
      ],
      dimension: "Manejo de críticas"
    },
    {
      id: 12,
      text: "Un amigo te hace una observación sobre algo de tu comportamiento que le molesta:",
      options: [
        { id: 'a', text: "Me disculpo excesivamente aunque no esté seguro de haber hecho algo realmente malo", type: 'PC' },
        { id: 'b', text: "Digo 'ah ok' y cambio de tema rápidamente sin profundizar", type: 'PE' },
        { id: 'c', text: "Escucho con apertura, agradezco que me lo diga y evalúo si es algo que quiero cambiar", type: 'A' },
        { id: 'd', text: "Me pongo defensivo y le señalo inmediatamente sus comportamientos molestos también", type: 'AI' },
        { id: 'e', text: "Le explico por qué actúo así y que tiene sus razones válidas, aunque le moleste", type: 'AD' },
        { id: 'f', text: "Digo 'está bien' pero me siento resentido y distancio la relación por un tiempo", type: 'PA' }
      ],
      dimension: "Manejo de críticas"
    },
    {
      id: 13,
      text: "Un amigo cancela planes contigo a último momento por segunda vez consecutiva:",
      options: [
        { id: 'a', text: "Le digo que no hay problema y que entiendo perfectamente, aunque me sienta decepcionado", type: 'PC' },
        { id: 'b', text: "Le digo 'está bien' pero luego yo también cancelo los próximos planes sin explicar", type: 'PE' },
        { id: 'c', text: "Le expreso que entiendo los imprevistos, pero que me gustaría que me avise con más tiempo porque valoro nuestro tiempo", type: 'A' },
        { id: 'd', text: "Le respondo molesto: '¡Otra vez! ¿Sabes qué? Ya ni te molestes en hacer planes'", type: 'AI' },
        { id: 'e', text: "Le hago saber que valorar el tiempo ajeno es básico y que espero más consideración de su parte", type: 'AD' },
        { id: 'f', text: "Le digo 'no te preocupes' pero luego me muestro frío y distante cuando nos vemos", type: 'PA' }
      ],
      dimension: "Expresión de emociones negativas"
    },
    {
      id: 14,
      text: "Te sientes sobrecargado de trabajo/responsabilidades y alguien te pide un favor adicional:",
      options: [
        { id: 'a', text: "Acepto el favor aunque esté al límite, no quiero decepcionar a nadie", type: 'PC' },
        { id: 'b', text: "Digo 'lo veo' o 'déjame checar' sabiendo que probablemente no podré", type: 'PE' },
        { id: 'c', text: "Explico mi situación actual y propongo ayudar en otro momento o de forma limitada", type: 'A' },
        { id: 'd', text: "Respondo irritado: '¡¿No ves que estoy hasta el cuello?! ¡No puedo con más!'", type: 'AI' },
        { id: 'e', text: "Le explico que tengo prioridades ya establecidas y que no puedo comprometerme en este momento", type: 'AD' },
        { id: 'f', text: "Acepto pero lo hago de mala gana y la persona se da cuenta de mi molestia", type: 'PA' }
      ],
      dimension: "Expresión de emociones negativas"
    },
    {
      id: 15,
      text: "Alguien hace una broma a tu costa que te incomoda:",
      options: [
        { id: 'a', text: "Me río junto con los demás aunque no me parezca gracioso ni cómodo", type: 'PC' },
        { id: 'b', text: "Me quedo callado o cambio de tema, esperando que no sigan con ese tipo de bromas", type: 'PE' },
        { id: 'c', text: "Con buen humor digo 'ok, esa estuvo de más' o 'prefiero que no hagamos bromas sobre ese tema'", type: 'A' },
        { id: 'd', text: "Hago una broma más fuerte o hiriente sobre esa persona para 'emparejar'", type: 'AI' },
        { id: 'e', text: "Les hago saber directamente que ese tipo de humor no me parece apropiado", type: 'AD' },
        { id: 'f', text: "Me quedo serio creando un ambiente incómodo, o respondo con sarcasmo después", type: 'PA' }
      ],
      dimension: "Expresión de emociones negativas"
    },
    {
      id: 16,
      text: "En una tienda te cobran de más por error:",
      options: [
        { id: 'a', text: "Pago sin decir nada, es poco dinero y no vale la pena el problema", type: 'PC' },
        { id: 'b', text: "Pago pero luego reviso el ticket y me quejo con quien me acompaña", type: 'PE' },
        { id: 'c', text: "Señalo el error educadamente y pido que por favor corrijan el cobro", type: 'A' },
        { id: 'd', text: "Les reclamo molesto: '¡Oye, me están cobrando de más! ¿Qué es esto?'", type: 'AI' },
        { id: 'e', text: "Indico el error y espero que lo corrijan, es su obligación cobrar correctamente", type: 'AD' },
        { id: 'f', text: "Pago sin decir nada pero luego dejo mala reseña o me quejo en redes", type: 'PA' }
      ],
      dimension: "Defensa de derechos propios"
    },
    {
      id: 17,
      text: "Alguien se cuela delante de ti en una fila:",
      options: [
        { id: 'a', text: "No digo nada, quizás tiene prisa o una emergencia", type: 'PC' },
        { id: 'b', text: "Toso fuerte o me acerco más esperando que se dé cuenta, pero no digo nada", type: 'PE' },
        { id: 'c', text: "Le hago notar con cortesía: 'Disculpa, la fila comienza atrás'", type: 'A' },
        { id: 'd', text: "Le digo en voz alta '¡Oye! ¡Hay una fila! ¡Fórmate como todos!'", type: 'AI' },
        { id: 'e', text: "Le indico que hay una fila y que todos estamos esperando nuestro turno", type: 'AD' },
        { id: 'f', text: "No le digo nada pero hago comentarios audibles sobre 'gente sin educación'", type: 'PA' }
      ],
      dimension: "Defensa de derechos propios"
    },
    {
      id: 18,
      text: "Te asignan un asiento/habitación/espacio en peores condiciones de lo que reservaste/pagaste:",
      options: [
        { id: 'a', text: "Lo acepto sin quejarme, no quiero ser exigente o causar problemas", type: 'PC' },
        { id: 'b', text: "Acepto pero pregunto 'si hay posibilidad' de algo mejor sin insistir mucho", type: 'PE' },
        { id: 'c', text: "Muestro mi reserva amablemente y pido lo que corresponde o una solución equivalente", type: 'A' },
        { id: 'd', text: "Les reclamo molesto: '¡Esto no es lo que pagué! ¡Soluciónenlo ya!'", type: 'AI' },
        { id: 'e', text: "Les muestro mi confirmación y les hago saber que esto debe solucionarse, pagué por un servicio", type: 'AD' },
        { id: 'f', text: "Acepto en el momento pero luego me quejo por redes, mail o con quien me acompaña", type: 'PA' }
      ],
      dimension: "Defensa de derechos propios"
    },
    {
      id: 19,
      text: "Un colega está pasando por un momento difícil y su desempeño ha bajado, afectando también tu trabajo:",
      options: [
        { id: 'a', text: "Asumo su carga de trabajo sin decir nada para no hacerlo sentir peor", type: 'PC' },
        { id: 'b', text: "Hago su parte sin decirle nada, pero empiezo a evitarlo o respondo corto", type: 'PE' },
        { id: 'c', text: "Le pregunto cómo está, ofrezco apoyo y converso sobre cómo redistribuir tareas temporalmente", type: 'A' },
        { id: 'd', text: "Le digo directo: 'Mira, entiendo que estés mal pero esto me está afectando'", type: 'AI' },
        { id: 'e', text: "Le hago saber que el trabajo debe continuar y que necesitamos encontrar soluciones prácticas ya", type: 'AD' },
        { id: 'f', text: "No le digo nada pero me quejo con otros colegas sobre la situación", type: 'PA' }
      ],
      dimension: "Empatía y consideración"
    },
    {
      id: 20,
      text: "Alguien te cuenta un problema personal y tú pasaste por algo similar:",
      options: [
        { id: 'a', text: "Solo escucho sin compartir mi experiencia, no quiero centrar la atención en mí", type: 'PC' },
        { id: 'b', text: "Escucho pero cambio de tema cuando puedo, me incomoda la profundidad emocional", type: 'PE' },
        { id: 'c', text: "Escucho primero, valido sus emociones y luego comparto brevemente si puede ser útil", type: 'A' },
        { id: 'd', text: "Interrumpo para contar mi historia inmediatamente: '¡A mí me pasó igual! Y yo hice...'", type: 'AI' },
        { id: 'e', text: "Le digo que no se preocupe tanto, que yo pasé por lo mismo y lo solucioné haciendo X cosa", type: 'AD' },
        { id: 'f', text: "Escucho pero luego doy consejos no solicitados o minimizo su problema", type: 'PA' }
      ],
      dimension: "Empatía y consideración"
    },
    {
      id: 21,
      text: "En un proyecto grupal, tu propuesta es diferente a la de la mayoría:",
      options: [
        { id: 'a', text: "Retiro mi propuesta y apoyo la mayoría aunque crea que no es la mejor opción", type: 'PC' },
        { id: 'b', text: "No insisto mucho y dejo que sigan con lo que ellos quieren", type: 'PE' },
        { id: 'c', text: "Explico los beneficios de mi propuesta, escucho las otras y estoy abierto a un punto medio", type: 'A' },
        { id: 'd', text: "Debato intensamente tratando de convencer a todos de que mi forma es mejor", type: 'AI' },
        { id: 'e', text: "Insisto en mi propuesta explicando por qué es la más adecuada según criterios objetivos", type: 'AD' },
        { id: 'f', text: "Cedo en apariencia pero luego implemento partes de mi idea sin consultar", type: 'PA' }
      ],
      dimension: "Manejo de diferencias de opinión"
    },
    {
      id: 22,
      text: "Alguien cuestiona tu conocimiento o experiencia en un tema que dominas:",
      options: [
        { id: 'a', text: "Me quedo callado y dejo que piensen lo que quieran, no vale la pena discutir", type: 'PC' },
        { id: 'b', text: "Digo algo vago como 'bueno, cada quien tiene su opinión' y cambio de tema", type: 'PE' },
        { id: 'c', text: "Comparto mi formación/experiencia de forma objetiva sin necesidad de sobreexplicarme", type: 'A' },
        { id: 'd', text: "Reacciono molesto: '¿En serio me estás cuestionando? ¿Sabes cuántos años llevo en esto?'", type: 'AI' },
        { id: 'e', text: "Aclaro mi experiencia y formación para que quede claro que sé de lo que hablo", type: 'AD' },
        { id: 'f', text: "No digo nada pero me ofendo y evito colaborar con esa persona después", type: 'PA' }
      ],
      dimension: "Manejo de diferencias de opinión"
    },
    {
      id: 23,
      text: "Alguien interrumpe constantemente mientras estás hablando en una conversación grupal:",
      options: [
        { id: 'a', text: "Dejo de hablar y los escucho, quizás lo que yo decía no era tan importante", type: 'PC' },
        { id: 'b', text: "Me voy callando poco a poco y me retiro mentalmente de la conversación", type: 'PE' },
        { id: 'c', text: "Digo con calma 'disculpa, me gustaría terminar mi punto' y retomo", type: 'A' },
        { id: 'd', text: "Levanto la voz o lo interrumpo también: '¡¿Me vas a dejar hablar o no?!'", type: 'AI' },
        { id: 'e', text: "Continúo hablando o señalo que todos merecemos ser escuchados sin interrupciones", type: 'AD' },
        { id: 'f', text: "Me callo de forma notoria creando silencio incómodo, o hago gestos de molestia", type: 'PA' }
      ],
      dimension: "Respuesta ante faltas de respeto"
    },
    {
      id: 24,
      text: "Recibes un mensaje grosero o irrespetuoso por texto/correo:",
      options: [
        { id: 'a', text: "No respondo o respondo como si no hubiera pasado nada", type: 'PC' },
        { id: 'b', text: "Respondo solo lo necesario sin abordar el tono, o tardo mucho en responder", type: 'PE' },
        { id: 'c', text: "Respondo señalando que el tono no es apropiado y pido hablar en persona o reformular", type: 'A' },
        { id: 'd', text: "Respondo con el mismo tono o más fuerte para que vea que no me dejo", type: 'AI' },
        { id: 'e', text: "Respondo de forma directa aclarando mi punto sin dejar pasar el tono inapropiado", type: 'AD' },
        { id: 'f', text: "No confronto pero comparto el mensaje con otros para quejarme o validarme", type: 'PA' }
      ],
      dimension: "Respuesta ante faltas de respeto"
    },
    {
      id: 25,
      text: "Tienes planes importantes para ti, pero alguien cercano te pide que los cambies por algo importante para ellos:",
      options: [
        { id: 'a', text: "Cancelo mis planes sin dudarlo, sus necesidades son más importantes que las mías", type: 'PC' },
        { id: 'b', text: "Digo que 'lo voy a pensar' pero ya sé que probablemente cederé", type: 'PE' },
        { id: 'c', text: "Evalúo ambas situaciones, expreso la importancia de mis planes y busco alternativas o equilibrio", type: 'A' },
        { id: 'd', text: "Le respondo molesto: '¡Siempre es lo mismo! ¿Por qué yo tengo que cambiar?'", type: 'AI' },
        { id: 'e', text: "Le explico que yo también tengo prioridades y que en esta ocasión no puedo cambiar mis planes", type: 'AD' },
        { id: 'f', text: "Acepto cambiar pero me siento resentido y se lo recuerdo después o lo uso en otra discusión", type: 'PA' }
      ],
      dimension: "Priorización de necesidades"
    }
  ];

  const styleNames = {
    'PC': 'Pasivo Complaciente',
    'PE': 'Pasivo Evitativo',
    'A': 'Asertivo',
    'AI': 'Agresivo Impulsivo',
    'AD': 'Agresivo Dominante',
    'PA': 'Pasivo-Agresivo'
  };

  const feedbacks = {
    'PC': {
      title: 'Pasivo Complaciente',
      content: `Tu estilo comunicativo tiene tendencia a ser **pasivo complaciente**. Priorizas mantener la armonía y evitar decepcionar a otros, frecuentemente aceptando situaciones o peticiones aunque no estés de acuerdo o te generen malestar. Tiendes a tragarte lo que piensas y sientes para no crear conflicto.

**Fortalezas:**
• Eres muy considerado y empático con los demás
• Valoras profundamente las relaciones y la armonía
• Las personas te perciben como alguien amable y colaborador
• Tienes una gran capacidad para ceder y ser flexible

**Áreas de crecimiento:**
• Expresar tus necesidades y opiniones es un derecho legítimo, no una imposición
• Decir "no" cuando es necesario protege tu bienestar físico y emocional
• Tus opiniones y necesidades tienen el mismo valor que las de los demás
• Complacer constantemente puede generar resentimiento acumulado y desgaste

**Impacto en tus relaciones:**
A corto plazo mantienes relaciones tranquilas, pero a largo plazo puedes sentir que no te conocen realmente o que tus relaciones son desiguales. El resentimiento acumulado puede explotar inesperadamente o llevarte al agotamiento emocional.

**Primeros pasos:**
• Practica expresar preferencias pequeñas en situaciones de bajo riesgo
• Identifica situaciones donde sientes resentimiento y pregúntate qué necesitabas expresar
• Recuerda: establecer límites no te hace egoísta, te hace humano`
    },
    'PE': {
      title: 'Pasivo Evitativo',
      content: `Tu estilo comunicativo tiene tendencia a ser **pasivo evitativo**. Evitas las confrontaciones directas dando excusas, pretextos o respuestas ambiguas. Prefieres no comprometerte claramente, usar intermediarios o evadir situaciones incómodas en lugar de expresar honestamente lo que piensas o sientes.

**Fortalezas:**
• Evitas conflictos innecesarios y tensiones directas
• Eres diplomático y prefieres mantener las aguas calmadas
• Tienes sensibilidad para detectar situaciones potencialmente conflictivas

**Áreas de crecimiento:**
• La evasión no resuelve problemas, solo los pospone
• La falta de claridad puede generar más confusión y frustración en otros
• Usar excusas en lugar de ser honesto erosiona la confianza
• Las personas merecen respuestas claras, incluso si son negativas

**Impacto en tus relaciones:**
Las personas pueden sentirse confundidas sobre dónde están contigo. La falta de claridad puede generar desconfianza o hacer que otros dejen de contar contigo.

**Primeros pasos:**
• Practica dar respuestas directas y honestas en situaciones de bajo riesgo
• En lugar de "tal vez", prueba "no, pero gracias por pensar en mí"
• Cuando uses a terceros, reformula en primera persona`
    },
    'A': {
      title: 'Asertivo',
      content: `Tu estilo comunicativo tiene tendencia a ser **asertivo**. Logras un equilibrio saludable entre expresar tus necesidades, opiniones y límites mientras respetas los derechos y perspectivas de los demás. Te comunicas de forma clara, directa y respetuosa.

**Fortalezas:**
• Expresas tus necesidades y opiniones con claridad y respeto
• Reconoces que tus derechos y los de otros tienen igual importancia
• Manejas conflictos de forma constructiva buscando soluciones
• Estableces límites saludables sin culpa ni agresión

**Áreas de atención:**
• Mantente atento a contextos culturales o situaciones que requieran adaptar tu enfoque
• Recuerda que la asertividad es una práctica continua, no un estado permanente

**Impacto en tus relaciones:**
Tus relaciones tienden a ser más honestas, equilibradas y duraderas. Las personas saben qué esperar de ti y confían en tu palabra.

**Continúa desarrollando:**
• Modela comunicación saludable para quienes te rodean
• Refina tu capacidad de leer contextos y adaptar tu comunicación`
    },
    'AI': {
      title: 'Agresivo Impulsivo',
      content: `Tu estilo comunicativo tiene tendencia a ser **agresivo impulsivo**. Reaccionas intensamente en el momento, frecuentemente sin filtro, interrumpes o hablas sin considerar plenamente el impacto de tus palabras. Tus emociones tienden a desbordarse antes de que puedas procesarlas.

**Fortalezas:**
• Eres auténtico y expresas lo que sientes en el momento
• No guardas rencores porque liberas tus emociones
• Eres apasionado y las personas saben cuando algo te importa

**Áreas de crecimiento:**
• La intensidad de tu reacción puede opacar tu mensaje válido
• Las palabras dichas en caliente pueden dañar relaciones de forma permanente
• Interrumpir o alzar la voz impide la comunicación efectiva

**Impacto en tus relaciones:**
Las personas pueden sentirse atacadas o temerosas de tu reacción, lo que limita la comunicación honesta.

**Primeros pasos:**
• Practica la pausa: cuenta hasta 5 antes de responder en situaciones emocionales
• Pregúntate: "¿Diría esto mismo si tuviera tiempo de pensarlo?"
• Identifica tus disparadores emocionales`
    },
    'AD': {
      title: 'Agresivo Dominante',
      content: `Tu estilo comunicativo tiene tendencia a ser **agresivo dominante**. Priorizas tus propias necesidades, intereses y puntos de vista, frecuentemente con dificultad para considerar las perspectivas ajenas con la misma validez.

**Fortalezas:**
• Eres claro sobre lo que piensas, quieres y necesitas
• Defiendes tus derechos y posiciones con firmeza y convicción
• Tienes capacidad de liderazgo y toma de decisiones

**Áreas de crecimiento:**
• Las necesidades y perspectivas de otros tienen igual validez que las tuyas
• La empatía fortalece la comunicación y los resultados, no los debilita
• Escuchar activamente puede revelar información valiosa

**Impacto en tus relaciones:**
Las personas pueden sentirse invalidadas, no escuchadas o menospreciadas. Aunque logres resultados a corto plazo, puedes generar resistencia pasiva.

**Primeros pasos:**
• Antes de hablar, pregúntate: "¿Cómo me sentiría yo en su lugar?"
• Practica escuchar completamente antes de responder
• Usa frases como "ayúdame a entender tu perspectiva"`
    },
    'PA': {
      title: 'Pasivo-Agresivo',
      content: `Tu estilo comunicativo tiene tendencia a ser **pasivo-agresivo**. Evitas la confrontación directa pero expresas tu descontento de formas indirectas: sarcasmo, cumplimiento renuente, sabotaje sutil, quejas a terceros o comunicación no verbal negativa.

**Patrón común:**
• Dices "sí" o "está bien" cuando en realidad piensas "no"
• Expresas molestia a través de acciones en lugar de palabras
• Evitas conflictos directos pero guardas resentimiento que se filtra

**Áreas de crecimiento:**
• La comunicación indirecta genera confusión y erosiona la confianza
• Los demás no son lectores de mente y merecen saber directamente qué te molesta
• Expresar directamente previene malentendidos y resuelve problemas

**Impacto en tus relaciones:**
Las personas pueden sentirse confundidas, frustradas o manipuladas. No saben realmente qué piensas o dónde están contigo.

**Primeros pasos:**
• Identifica qué te impide expresar tu molestia directamente
• Practica usar "yo siento/pienso/necesito..." en lugar de señales indirectas
• Reemplaza quejas a terceros con conversaciones directas`
    }
  };

  const handleAnswer = (questionId, optionType) => {
    setAnswers({ ...answers, [questionId]: optionType });
  };

  const sendToGoogleSheets = async (results) => {
    try {
      const data = {
        timestamp: new Date().toISOString(),
        nombre: userData.nombre,
        email: userData.email,
        pasivoComplaciente: results.percentages.PC,
        pasivoEvitativo: results.percentages.PE,
        asertivo: results.percentages.A,
        agresivoImpulsivo: results.percentages.AI,
        agresivoDominante: results.percentages.AD,
        pasivoAgresivo: results.percentages.PA,
        perfil: results.profile,
        segundoPerfil: results.secondProfile || '',
        respuestas: JSON.stringify(answers)
      };

      if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL !== 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
      }
    } catch (error) {
      console.log('Error enviando datos:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (Object.keys(answers).length === questions.length) {
      const results = calculateResults();
      sendToGoogleSheets(results);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setStage('intro');
    setUserData({ nombre: '', email: '' });
  };

  const calculateResults = () => {
    const counts = {
      'PC': 0,
      'PE': 0,
      'A': 0,
      'AI': 0,
      'AD': 0,
      'PA': 0
    };

    Object.values(answers).forEach(type => {
      counts[type]++;
    });

    const total = Object.keys(answers).length;
    const percentages = {};
    Object.keys(counts).forEach(key => {
      percentages[key] = total > 0 ? ((counts[key] / total) * 100).toFixed(1) : 0;
    });

    let maxCount = 0;
    let dominantStyle = '';
    Object.keys(counts).forEach(key => {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        dominantStyle = key;
      }
    });

    let secondStyle = '';
    let secondMax = 0;
    Object.keys(percentages).forEach(key => {
      if (key !== dominantStyle && parseFloat(percentages[key]) > 20 && parseFloat(percentages[key]) > secondMax) {
        secondMax = parseFloat(percentages[key]);
        secondStyle = key;
      }
    });

    return {
      counts,
      percentages,
      profile: styleNames[dominantStyle],
      profileCode: dominantStyle,
      secondProfile: secondStyle ? styleNames[secondStyle] : null,
      secondProfileCode: secondStyle,
      secondPercentage: secondStyle ? percentages[secondStyle] : null
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const selectedOption = answers[currentQ?.id];

  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <img src={LOGO_BASE64} alt="NeuroWellness Learning" className="mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#2C3E50' }}>
              Test de Asertividad
            </h1>
            <p className="text-sm text-gray-500">
              Material desarrollado por Maria Alejandra Urdaneta
            </p>
            <p className="text-xs text-gray-400">
              Propiedad intelectual, todos los derechos reservados
            </p>
          </div>

          <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Bienvenido al Test de Asertividad, una herramienta diseñada para ayudarte a 
              comprender mejor tu estilo de comunicación en diferentes situaciones cotidianas.
            </p>
            <p>
              La asertividad es la capacidad de expresar tus pensamientos, sentimientos y 
              necesidades de manera clara y respetuosa, sin violar los derechos de los demás. 
              Este test te ayudará a identificar si tu estilo de comunicación tiende hacia:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Pasivo Complaciente:</strong> Aceptar para mantener armonía, tragarse lo que se piensa</li>
              <li><strong>Pasivo Evitativo:</strong> Dar excusas, evadir, no comprometerse claramente</li>
              <li><strong>Asertivo:</strong> Equilibrio entre expresar necesidades y respetar a otros</li>
              <li><strong>Agresivo Impulsivo:</strong> Reaccionar sin filtro, hablar sin pensar</li>
              <li><strong>Agresivo Dominante:</strong> Priorizar propios intereses con dificultad para la empatía</li>
              <li><strong>Pasivo-Agresivo:</strong> Expresar descontento de forma indirecta</li>
            </ul>
            <p>
              El test consta de <strong>25 situaciones</strong> de la vida real. Para cada una, 
              selecciona la opción que mejor describa cómo actuarías normalmente. No hay respuestas 
              correctas o incorrectas, lo importante es ser honesto contigo mismo.
            </p>
            <p className="text-sm text-gray-600 italic">
              Tiempo estimado: 10-15 minutos
            </p>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#2C3E50' }}>
              Antes de comenzar, por favor completa:
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={userData.nombre}
                  onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#C8A2C8' }}
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#C8A2C8' }}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (userData.nombre && userData.email) {
                  setStage('test');
                }
              }}
              disabled={!userData.nombre || !userData.email}
              className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                userData.nombre && userData.email
                  ? 'text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={userData.nombre && userData.email ? { backgroundColor: '#2C3E50' } : {}}
            >
              Comenzar Test
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Tus datos serán utilizados únicamente para fines de investigación y análisis estadístico
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    const feedback = feedbacks[results.profileCode];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img src={LOGO_BASE64} alt="NeuroWellness Learning" className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C3E50' }}>
              Resultados: Test de Asertividad
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Tu estilo comunicativo tiene tendencia a ser:
            </h2>
            <p className="text-3xl font-bold mb-6" style={{ color: '#C8A2C8' }}>{results.profile}</p>
            
            {results.secondProfile && (
              <p className="text-lg text-gray-700 mb-6">
                También muestras tendencias hacia <strong>{results.secondProfile}</strong> ({results.secondPercentage}%) en algunas situaciones.
              </p>
            )}

            <div className="space-y-3 mb-8">
              {Object.keys(styleNames).map((key, index) => {
                const colors = ['#93C5FD', '#60A5FA', '#34D399', '#FB923C', '#F87171', '#C084FC'];
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{styleNames[key]}</span>
                      <span className="text-sm font-medium text-gray-700">{results.percentages[key]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${results.percentages[key]}%`,
                          backgroundColor: colors[index]
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {feedback.content}
              </div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            style={{ backgroundColor: '#2C3E50' }}
          >
            <RotateCcw size={20} />
            Reiniciar Test
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Material desarrollado por Maria Alejandra Urdaneta
            </p>
            <p className="text-xs text-gray-400">
              Propiedad intelectual, todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <img src={LOGO_BASE64} alt="NeuroWellness Learning" style={{ height: '60px' }} />
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%`, backgroundColor: '#C8A2C8' }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium mb-2" style={{ color: '#C8A2C8' }}>{currentQ.dimension}</p>
          <p className="text-lg text-gray-800 leading-relaxed mb-6">{currentQ.text}</p>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.type)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOption === option.type
                    ? 'bg-opacity-10'
                    : 'border-gray-200 hover:border-opacity-50 bg-white'
                }`}
                style={selectedOption === option.type ? { 
                  borderColor: '#C8A2C8', 
                  backgroundColor: 'rgba(200, 162, 200, 0.1)' 
                } : {}}
              >
                <span className="font-medium mr-2" style={{ color: '#C8A2C8' }}>{option.id})</span>
                <span className="text-gray-700">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              !selectedOption
                ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                : ''
            }`}
            style={selectedOption ? { backgroundColor: '#2C3E50' } : {}}
          >
            {currentQuestion === questions.length - 1 && Object.keys(answers).length === questions.length
              ? 'Ver Resultados'
              : 'Siguiente'}
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          © NeuroWellness Learning
        </p>
      </div>
    </div>
  );
};

export default TestAsertividad;
