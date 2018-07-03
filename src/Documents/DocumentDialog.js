import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@material-ui/core";

class DocumentDialog extends React.Component {
    texts = {
        'contacts': "Фактический адрес: 142000, Племхозский проезд, 1\n" +
        'Электронная почта: info@stretchandgo.ru\n' +
        'Телефоны: 8-906-018-0010\n' +
        'Реквизиты:\n' +
        'ИП Батищев Николай Васильевич ИНН 500907008566 / ОГРНИП 312500917900038,\n' +
        'Юридический адрес: 142000, г.Домодедово, ул.Тройцкая, 37\n' +
        'Тел./факс: 8-906-018-0010',
        'about': 'Студия растяжки Stretch&go',
        'refund': 'Оплата является авансовой и возврату не подлежит',
        'contract': 'ИП Батищев Н. В.   (ОГРНИП 312500917900038), действующий на основании Свидетельства о государственной регистрации юридического лица, именуемый в дальнейшем Студия  растяжки Stretch and Go (далее - Студия), с одной стороны, и Клиент, с другой стороны, далее совместно именуемые Стороны, заключили настоящий Договор о нижеследующем:\n' +
        '\n' +
        '1. Понятия и определения, применяемые в настоящем Договоре.\n' +
        '\n' +
        '1.1. Клиент - физическое лицо, заполнившее и подписавшее Уведомление о состоянии здоровье клиента, а также оплатившее оказание соответствующих услуг по настоящему Договору.\n' +
        '\n' +
        '1.2. Уведомление о состоянии здоровья клиента (далее - Уведомление), – документ, подтверждающий информированное согласие Клиента с Правилами посещения и Договором, который является приложением к настоящему Договору. Путем подписания Уведомления, Клиент присоединяется к настоящему Договору.\n' +
        '\n' +
        '1.3. Услуги - предоставление Клиенту права посещения занятий по физической культуре и спорту по программе Стретчинг, проводимых в группах, мини-группах, а также в форме индивидуальных тренировок в соответствии с расписанием Студии, включая услуги по бронированию для Клиента места в группах, услуги по администрированию заявления Клиента и подготовки абонемента.\n' +
        '\n' +
        '1.4. Часы оказания услуг Клиенту: с понедельника по воскресенье 9:00 до 21:00.\n' +
        '1.5. Место оказания Услуг – г. Домодедово ул. Племхозский проезд д. 1 ТЦ Западный\n' +
        '\n' +
        '1.6. Тренер – лицо осуществляющее проведение тренировок в ходе оказания Услуги Клиенту.\n' +
        '\n' +
        '2. Предмет Договора\n' +
        '\n' +
        '2.1. Студия обязуется на условиях настоящего Договора и в соответствии с Правилами, являющимися приложением к Договору, оказывать Клиенту Услуги, а Клиент обязуется оплачивать эти Услуги.\n' +
        '\n' +
        '2.2. Настоящий Договор является договором присоединения и Клиент путем подписания Уведомления принимает условия настоящего Договора в полном объеме и Договор вступает в силу с даты подписания Клиентом Уведомления.\n' +
        '\n' +
        '2.3. Договор действует в периоды оказания Услуг в соответствии с п.2.4, либо до даты расторжения Договора по соглашению Сторон, либо до даты расторжения Договора в одностороннем порядке по инициативе одной из Сторон.\n' +
        '\n' +
        '2.4. Услуги Клиенту оказываются после оплаты одного из вариантов получения Услуги (абонемента):\n' +
        '\n' +
        '\n' +
        '- разового занятия,\n' +
        '\n' +
        '- 8 занятий, \n' +
        '\n' +
        '- индивидуальной тренировки.\n' +
        '\n' +
        '\n' +
        '2.5. Стоимость абонементов определяется Студией и доводится до сведения Клиента.\n' +
        '\n' +
        '2.6. Клиент производит оплату Услуг по стоимости, действующей на момент оплаты, и посредством оплаты соглашается с действующей стоимостью Услуги. На момент подписания Уведомления Клиент подтверждает, что ознакомился и согласен со стоимостью Услуг, действующей на момент подписания Уведомления.\n' +
        '\n' +
        'Датой, с которой Клиент получает право пользоваться Услугой (активации Абонемента), считается дата первой тренировки.\n' +
        '\n' +
        'В подтверждение оплаты Клиенту зачисляются занятия в соответствии с количеством приобретенных тренировок на сайте в личном кабинете Клиента, которые могут быть использованы клиентом для записи на занятия на сайте в соответствии с количеством свободных мест и действующим расписанием. После записи на сайте Клиент имеет право на посещение соответствующего занятия. \n' +
        '\n' +
        '2.7. Оплата по Договору производится до оказания Услуг в качестве аванса, выплачиваемого за Услуги, подлежащие оказанию Клиенту в пределах соответствующего периода времени.\n' +
        '\n' +
        '2.8. В случае если Клиент оплатил соответствующие тренировки, однако в течении установленного периода не воспользовался Услугами и не сообщил об отказе от Договора, то Услуги считаются оказанными, а выплаченный аванс не возвращается. Указанное Обусловлено наличием расходов Студии в связи с оказанием услуги по бронированию места в группах для Клиента,  а также подготовкой к организации тренировок для Клиента, который не воспользовался приобретенным правом на получение Услуг.\n' +
        '\n' +
        '\n' +
        '2.9. Все расчеты по настоящему Договору осуществляются в безналичной форме в рублях.\n' +
        '\n' +
        '3. Права и обязанности Сторон\n' +
        '\n' +
        '3.1. Студия обязуется:\n' +
        '\n' +
        '3.1.1. Обеспечить надлежащее качество предоставляемых Клиенту Услуг в соответствии со внутренними методиками и стандартами Студии и согласно расписанию тренировок.\n' +
        '\n' +
        '3.1.2. Обеспечить надлежащее функционирование оборудования и инвентаря, используемого при оказании Услуг.\n' +
        '\n' +
        '3.2. Студия имеет право в одностороннем порядке изменять:\n' +
        '\n' +
        '* расписание тренировок,\n' +
        '* \n' +
        '* заявленного в расписании тренера,\n' +
        '* \n' +
        '* стоимость Услуг, при условии что изменение осуществляется до момента оплаты Абонемента Клиентом.\n' +
        '* \n' +
        '3.3. Клиент обязуется:\n' +
        '\n' +
        '3.3.1. Оплачивать Услуги в порядке и на условиях настоящего Договора.\n' +
        '\n' +
        '3.3.2. Не передавать абонемент третьим лицам. Права Клиента по настоящему Договору не могут быть переданы третьим лицам без согласия Студии в связи с тем, что личность Клиента имеет существенное значение для Студии.\n' +
        '\n' +
        '3.3.3. Бережно относиться к имуществу Студии.\n' +
        '\n' +
        '3.3.4. Во избежание травм не пользоваться неисправным оборудованием и инвентарем, а также оборудованием и инвентарем, правила пользования которым не известны.\n' +
        '\n' +
        '3.3.5. Клиент подтверждает, что не имеет медицинских противопоказаний для занятий по выбранной программе. До начала занятий Клиент обязан пройти медицинское обследование с целью определения возможности осуществления тренировок по программе Стретчинга, а также установления возможных медицинских ограничений.\n' +
        '\n' +
        'Клиент обязан проходить медицинское обследование не реже одного раза в год, а по требованию Студии и чаще.\n' +
        '\n' +
        '4. Ответственность Сторон\n' +
        '\n' +
        '4.1. Клиент несет ответственность за вред, причиненный имуществу Студии в размере стоимости поврежденного и/или утраченного имущества. При этом, Студия вправе в одностороннем порядке зачесть стоимость не оказанных, но оплаченных Клиентом Услуг в счет погашения причиненного вреда.\n' +
        '\n' +
        '4.2. Клиент, подтверждая свой личный номер телефона по средством ввода кода полученного в смс, подтверждает, что он согласен с заключением настоящего Договора, ознакомлен и принимает Правила посещения, и что он не имеет противопоказаний медицинского или иного рода для занятий по программе Стретчинга, что его физическая форма позволяет ему проходить тренировки по указанной программе. Клиент самостоятельно несет все риски, связанные с ухудшением его здоровья в ходе оказания Услуг или с причинёнными травмами в ходе тренировок.\n' +
        '\n' +
        '4.3. К Студии не могут быть предъявлены какие-либо требования в связи с ухудшением состояния здоровья Клиента или причиненными травмами.\n' +
        '\n' +
        '4.4. Студия не несет ответственности за вред, связанный с ухудшением здоровья, если состояние Клиента ухудшилось в результате острого заболевания, обострения травмы или хронического заболевания, а также в случаях, если причиной нанесения вреда здоровью стало нарушение правил пользования оборудованием или инвентарем.\n' +
        '\n' +
        '4.5. Студия не несет ответственность за вред, причиненный здоровью Клиента исключительно в результате виновных действий Студии направленных непосредственно и исключительно на причинение вреда здоровью Клиента.\n' +
        '\n' +
        '4.6. Студия не несёт ответственности за вред, причинённый жизни и/ или здоровью Клиента, наступивший в результате:\n' +
        '\n' +
        '- сообщения им Студии недостоверных сведений о состоянии здоровья или не сообщения таких сведений;\n' +
        '\n' +
        '- острого или хронического заболевания Клиента, обострения травмы;\n' +
        '\n' +
        '- умысла Клиента;\n' +
        '\n' +
        '- неосторожности Клиента;\n' +
        '\n' +
        '- занятия Клиента по собственной программе, не согласованной с тренером Студии или собственно со Студией.\n' +
        '\n' +
        '- нарушения Клиентом Правил посещения и/ или рекомендаций тренеров Студии и/ или рекомендаций, размещенных на информационных и/ или предупредительных, запретительных табличках в помещениях и на площадках для проведения занятий или на оборудовании;\n' +
        '\n' +
        '- действий третьих лиц;\n' +
        '\n' +
        '- в иных случаях, предусмотренных законодательством Российской Федерации.\n' +
        '\n' +
        '4.7. Студия не несет ответственности за вред здоровью и/или имуществу Клиента, причиненный действиями третьих лиц.\n' +
        '\n' +
        '5. Заключительные положения\n' +
        '\n' +
        '5.1. Студия имеет право в одностороннем внесудебном порядке отказаться от исполнения настоящего Договора при условии возврата Клиенту стоимости оплаченных, но не оказанных Услуг.\n' +
        '\n' +
        '5.2. Студия вправе привлекать для оказания Услуг третьих лиц.\n' +
        '\n' +
        '5.3. Правила посещения и Уведомление являются приложениями к настоящему Договору, составляют его неотъемлемую часть. Принимая условия настоящего Договора, Клиент выражает безусловное согласие с положениями и условиями вышеуказанных Правил.\n' +
        '\n' +
        '5.4. Студия вправе изменять и дополнять вышеуказанные Правила, а также принимать Правила техники безопасности. Клиент считается ознакомленым с изменениями, дополнениями Правил, Правилами в новой редакции, Правилами техники безопасности по истечении 5 (пяти) календарных дней с даты их утверждения, при условии размещения их текста Студией на информационных стендах, и/ или иных носителях в Студии и/ или на сайте Студии.\n' +
        '\n' +
        'Настоящий Договор является Договором присоединения. Принятие его условий Клиентом осуществляется посредством подтверждения личного номера телефона на сайте.',
        'payment': 'Услуги оплачиваются непосредственно до их фактического оказания на сайте stretchandgo.ru Оплата происходит через ПАО СБЕРБАНК с использованием Банковских карт следующих платежных систем: \n' +
        '* Мир\n' +
        '* VISA\n' +
        '* Mastercard Worldwide',
        'rules': '\n' +
        'Настоящие Правила регулируют отношения между ИП Бариевым Н. В. (Студия  растяжки Stretch and Go  далее Студия), тренерами (инструкторами), работниками Студии, клиентами Студии, потенциальными клиентами Студии, гостями Студии (далее Клиент) при оказании Студией Клиентам услуг по проведению занятий по физической культуре и спорту.\n' +
        '\n' +
        'Настоящие Правила применяются в местах оказания Услуг, а именно на оборудованных площадках и в помещениях, оснащенных специальными техническими средствами и предназначенными для занятий физической подготовкой и выполнения физических упражнений по программе Студии.\n' +
        '\n' +
        'Под Клиентом понимается физическое лицо, имеющее намерение заняться физической подготовкой, то есть развитием физических качеств, способностей (в том числе навыков и умений) с учетом вида его деятельности и социально-демографических характеристик, а также для поддержания и укрепления здоровья, профилактики заболеваний, поддержания высокой работоспособности.\n' +
        '\n' +
        'Правила посещения обязательны для исполнения Клиентами. При этом Студия вправе дополнять и изменять Правила в одностороннем порядке, уведомив об изменениях Клиента.\n' +
        '\n' +
        '\n' +
        'Клиент обязан ознакомится с настоящими Правилами и выполнять предписания, указанные в них.\n' +
        '\n' +
        '1. Часы работы Студии: понедельник – воскресенье с 09:00 до 21:00. Студия оставляет за собой право в одностороннем порядке изменять часы работы Студии и/ или часы пользования отдельными зонами/ студиями/ залами.\n' +
        '\n' +
        'Запись на занятия в Студию осуществляется по средством записи на сайте stretchandgo.ru .\n' +
        '\n' +
        'Часы работы Студии размещаются на информационных стендах, и/ или иных носителях в Студии, и/ или на сайте Студии stretchandgo.ru / или иным способом доводятся до сведения Клиента.\n' +
        '\n' +
        '2. Клиент вправе пользоваться помещениями Студии и оборудованием Студии только в часы работы Студии. Клиент обязан покинуть помещения Студии до наступления времени окончания ее работы.\n' +
        '\n' +
        '3. При регистрации Клиент обязан указать следующие персональные данные: фамилию, имя, телефон.\n' +
        '\n' +
        '4. Стоимость и перечень оказываемых Студией услуг определяется по установленным Студией расценкам и размещается на информационных стендах, и/ или иных носителях в Студии, и/ или на сайте Студии stretchandgo.ru и/ или иным способом доводятся до сведения Клиента. Студия вправе оказывать Услуги по специальным, более низким, расценкам, в том числе посредством проведения акций.\n' +
        '\n' +
        'Услуги оплачиваются непосредственно до их фактического оказания на сайте stretchandgo.ru Оплата происходит через ПАО СБЕРБАНК с использованием Банковских карт следующих платежных систем: \n' +
        '* Мир\n' +
        '* VISA\n' +
        '* Mastercard Worldwide\n' +
        '\n' +
        '5. Студия проводит занятия по программе: Стретчинг. Занятия проводятся в следующих формах: в группах, мини-группах, индивидуальные тренировки.\n' +
        '\n' +
        'Студия применяет следующие варианты оплаты тренировок:\n' +
        '\n' +
        '1) оплата одной тренировки (разовая оплата);\n' +
        '\n' +
        '2) приобретение абонемента – права на получение услуги в течении определенного времени или права на определенное количество тренировок.\n' +
        '3)оплата персональной тренировки\n' +
        '\n' +
        '\n' +
        '\n' +
        'Абонемент на 8тренировок. Срок действия абонемента составляет 4 недели с даты первой тренировки. \n' +
        '\n' +
        'Абонементы по акции.\n' +
        '\n' +
        'Датой активации абонемента считается дата посещения первой тренировки.\n' +
        '\n' +
        'Действие абонемента заканчивается в случае посещения Клиентом оплаченного количества занятий либо по истечении срока его действия.\n' +
        '\n' +
        'Студия вправе изменять типы и характеристики абонементов.\n' +
        '\n' +
        'Стоимость абонементов определяется ИП Батищев Н. В.  и доводится до сведения Клиента через размещение информации на сайте, или информационных стендах, размещенных в помещениях Студии. Клиент приобретает абонемент по стоимости, действующей на момент его приобретения, и посредством приобретения абонемента соглашается с его действующей стоимостью.\n' +
        '\n' +
        'Оплата занятий и абонементов является авансовой. При отказе клиента от услуг, оплата не возвращается с условиями Договора.\n' +
        '\n' +
        '\n' +
        '6. Перед каждом посещении Студии Клиент обязан  оплатить  разовое занятие или приобрести абонемент и записаться на занятие на сайте. \n' +
        '\n' +
        '7. Приходить на занятие необходимо не позднее, чем за 10 минут до начала занятия. При опоздании клиента на занятие более, чем на 5 минут, администрация студии вправе не допустить клиента к посещению, при этом занятие будет засчитано.\n' +
        '\n' +
        'Обладатели абонементов не имеют права передавать их в пользование третьим лицам. Услуги по данным документам предоставляются исключительно Клиентам, на чье имя оформлен данный абонемент. В случае несанкционированной передачи абонемента данный документ может быть изъят, а его действие приостановлено.\n' +
        '\n' +
        '8. Студия ведет учет оказываемых Клиенту услуг с помощью внутренней системы учета. В спорных ситуациях достаточным подтверждением объема и стоимости оказанных услуг являются данные системы учета Студии.\n' +
        '\n' +
        '9. На время нахождения в помещениях Студии Клиенту выдается ключ и предоставляется в пользование общий шкаф для личных вещей. Студия не несет ответственности за вещи Клиента, в том числе оставленные без присмотра в шкафу для хранения личных вещей. За потерю или невозврат ключа предусмотрен штраф в размере 500 рублей.\n' +
        '\n' +
        '10. Во время проведения мероприятий Студией могут быть ограничены зоны для использования Клиентами.\n' +
        '\n' +
        '11. Расписание занятий размещается на сайте Студии stretchandgo.ru и в помещении Студии. Студия вправе вносить изменения в действующее Расписание и производить замену заявленного работника Студии.\n' +
        '\n' +
        'Обязательной является предварительная запись на занятия на сайте Студии.\n' +
        '\n' +
        'Клиент вправе отменить запись на занятия не позднее, чем за 6 часов до начала занятия. В противном случае занятие будет засчитано.\n' +
        '11.1 При отмене индивидуального занятия менее, чем за 6 часов, занятие будет засчитано. \n' +
        '\n' +
        '11.2 При отмене разового занятия менее, чем за 6 часов, занятие будет засчитано.\n' +
        '\n' +
        '12. Клиентам необходимо обязательно соблюдать следующие требования:\n' +
        '\n' +
        '12.1. быть внимательными и аккуратно передвигаться в раздевалках и иных помещениях Студии, обязательно используя специальную сменную, чистую, устойчивую и нескользящую обувь;\n' +
        '\n' +
        '12.2. соблюдать правила личной и общей гигиены, поддерживать чистоту в помещениях Студии;\n' +
        '\n' +
        '12.3. не оставлять личные вещи без присмотра;\n' +
        '\n' +
        '12.4. уважительно и бережно относиться друг к другу, работникам Студии, третьим лицам, имуществу Клиентов, Студии и третьих лиц.\n' +
        '\n' +
        '13. Клиентам запрещено:\n' +
        '\n' +
        '13.1. Принимать пищу в местах, предназначенных для занятий, в зонах отдыха и раздевалках Студии.\n' +
        '\n' +
        '13.2. Использовать стеклянную или иную бьющуюся посуду для напитков или приема пищи во всех зонах Студии. Необходимо пользоваться только пластиковыми или бумажными стаканами и/ или иными пластиковыми/бумажными емкостями.\n' +
        '\n' +
        '13.3. Курить и/ или находиться в помещениях Студии в состоянии алкогольного, наркотического, токсического опьянения.\n' +
        '\n' +
        '13.4. Приносить и хранить в помещениях Студии опасные вещества и предметы: взрывчатые вещества, средства взрывания и предметы, ими начиненные, сжатые и сжиженные газы, легковоспламеняющиеся жидкости, воспламеняющиеся твердые вещества, окисляющие вещества и органические перекиси, токсичные вещества, радиоактивные материалы, едкие и коррозирующие вещества, ядовитые и отравляющие вещества, оружие.\n' +
        '\n' +
        '13.5. Использовать ненормативную лексику, как при общении, так и в разговорах по телефону в помещениях Студии, громко, неуважительно и/ или агрессивно разговаривать, делать все, что может помешать окружающим.\n' +
        '\n' +
        '13.6. Оставлять собственный инвентарь на хранение в помещениях Студии без предварительной договоренности и согласия администратора Студии.\n' +
        '\n' +
        '13.7. Самостоятельно менять температурный режим, уровень освещения, направленность телевизионных панелей и громкость звукового сопровождения.\n' +
        '\n' +
        '13.8. Самостоятельно пользоваться музыкальной и другой аппаратурой Студии, в том числе включать и/ или демонстрировать аудио-, видео- и иные произведения с использованием/ применением любых носителей и/ или оборудования в помещениях Студии. Студия оставляет за собой исключительное право на выбор произведений, транслируемых в Студии, а также порядок их трансляции. Если музыкальное сопровождение в Студии мешает, рекомендуем при себе иметь портативный проигрыватель с наушниками и пользоваться им по мере необходимости и при условии, что его использование не создаст угрозу и/ или не причинит вред здоровью.\n' +
        '\n' +
        '13.9. Использовать парфюмерию, мази и другую косметическую продукцию с резким запахом, а также средства, портящие или загрязняющие оборудование, помещения и интерьер Студии.\n' +
        '\n' +
        '13.10. Передавать абонемент Клиентам, третьим лицам.\n' +
        '\n' +
        '13.11. Находиться в технических помещениях и помещениях, предназначенных для работников Студии.\n' +
        '\n' +
        '13.12. Самостоятельно размещать в помещениях Студии надписи, объявления, рекламные материалы, проводить опросы или осуществлять рекламную, маркетинговую, консультационную и иную деятельность, в том числе предпринимательскую.\n' +
        '\n' +
        '13.13. Собирать и/ или распространять любыми способами персональные данные, информацию о личной жизни Клиентов, работников Студии.\n' +
        '\n' +
        '\n' +
        '\n' +
        '13.14. Приносить и пользоваться в помещениях Студии электробытовыми приборами.\n' +
        '\n' +
        '14. За утерю абонемента, ключей от ячейки для хранения личных вещей, взятых в аренду предметов Клиент по требованию Студии обязан оплатить соответствующую плату в размере, установленном Студией.\n' +
        '\n' +
        '15. Забытые Клиентами вещи, если они были обнаружены в помещениях Студии, хранятся только в течение 1 (одного) месяца со дня их обнаружения. За утерянные или оставленные без присмотра вещи Студия ответственности не несёт.\n' +
        '\n' +
        '16. Если Клиент при получении имущества Студии не предъявил претензий, данное имущество считается выданным ему в исправном состоянии.\n' +
        '\n' +
        '17. Студия не несет ответственности за транспортные средства, оставленные на прилегающей территории Студии.\n' +
        '\n' +
        '18. Студия не несёт ответственности за вред имуществу Клиента, причинённый действиями третьих лиц.\n' +
        '\n' +
        '19. За технические неудобства, вызванные проведением городскими учреждениями, организациями, коммунальными и эксплуатационными службами, сезонных профилактических и/ или ремонтных работ, Студия ответственности не несёт и не обязана выплатить и/ или предоставить Клиенту какую-либо компенсацию.\n' +
        '\n' +
        '20. В случае аварийных ситуаций и/ или обстоятельств непреодолимой силы, произошедших не по вине Студии, Студия может в одностороннем порядке ограничивать объём и порядок предоставляемых Услуг без выплаты и/ или предоставления Клиенту какой-либо компенсации.\n' +
        '\n' +
        '21. Студия вправе в одностороннем порядке изменить условия Договора в случае реконструкции, ремонта здания или помещений Студии, а также закрытия Студии по не зависящим от нее обстоятельствам.\n' +
        '\n' +
        '22. В случае нарушения Клиентом Правил Студия оставляет за собой право пересмотреть действие Договора, в том числе Студия вправе отказать в предоставлении Услуг в связи с отказом Клиента выполнять требования Правил, информационных табличек, размещенных в Студии, инструкций, рекомендаций работников Студии.\n' +
        '\n' +
        '23. Любая информация (в том числе: фамилия, имя, отчество, дата рождения, адреса, телефоны, информация о работе, порядке посещения, пользования Услугами Студии и прочая) о Клиентах, а также о работниках Студии является конфиденциальной и предоставлению/ разглашению Студией, работниками Студии, Клиентами третьим лицам не подлежит, за исключением случаев, предусмотренных действующим законодательством Российской Федерации.\n' +
        '\n' +
        '24. Изменение, дополнение Правил, а равно пользование Студией правами, предусмотренными Правилами, Договором, не является основанием для предоставления Клиентам каких-либо компенсаций. \n' +
        '\n' +
        '25. Данные правила являются неотъемлемой частью Договора.',
        'confidential': 'Студия растяжки Stretch and Go\n' +
        '\n' +
        'Политика конфиденциальности (далее — Политика в отношении обработки персональных данных, Политика) действует в отношении всей информации, которую Студия растяжки Stretch and Go (далее – Cтудия, Исполнитель) и/или его аффилированные лица могут получить о Клиенте в связи с заключенным между Исполнителем и Клиентом договором, предусматривающим оказание Клиенту услуг по проведения занятий по физической культуре и спорту (далее - Услуги).\n' +
        '\n' +
        'Принятие Клиентом условий договора, в соответствии с которым Исполнитель оказывает Услуги, означает безоговорочное согласие Клиента с настоящей Политикой и указанными в ней условиями обработки его персональной информации.\n' +
        '\n' +
        '1. Персональная информация Клиента, которую обрабатывает Исполнитель\n' +
        '\n' +
        '1.1. В рамках настоящей Политики под «персональной информацией Клиента» понимается персональная информация, которую Клиент предоставляет о себе самостоятельно при заключении и в процессе исполнения договора с Исполнителем, включая персональные данные Клиента.\n' +
        '\n' +
        '1.2. Исполнитель не проверяет достоверность персональной информации, предоставляемой Клиентом, и не имеет возможности оценивать его дееспособность. Однако Исполнитель исходит из того, что Клиент предоставляет достоверную и достаточную персональную информацию и поддерживает эту информацию в актуальном состоянии. Риск любых неблагоприятных последствий предоставления Клиентом недостоверной или недостаточной информации несет Клиент.\n' +
        '\n' +
        '2. Цели обработки персональной информации Клиентов\n' +
        '\n' +
        '2.1. Исполнитель собирает и хранит только ту персональную информацию, которая необходима для исполнения договора с Клиентом, за исключением случаев, когда законодательством предусмотрено обязательное хранение персональной информации в течение определенного законом срока.\n' +
        '\n' +
        '2.2. Персональную информацию Клиента Исполнитель обрабатывает в следующих целях:\n' +
        '\n' +
        '2.2.1. Идентификация стороны в рамках договора с Исполнителем;\n' +
        '\n' +
        '2.2.2. Исполнение договора с Клиентом;\n' +
        '\n' +
        '2.2.3. Связь с Клиентом, в том числе направление уведомлений, запросов и информации, касающихся исполнения договора, а также обработка заявлений от Клиента;\n' +
        '\n' +
        '2.2.4. Улучшение качества услуг, оказываемых Исполнителем, удобства их использования, разработка новых видов услуг;\n' +
        '\n' +
        '2.2.5. Проведение рекламных мероприятий Исполнителя, его партнеров и аффилированных лиц;\n' +
        '\n' +
        '2.2.6. Проведение статистических, социологических и иных исследований Исполнителем, его партнерами и аффилированными лицами.\n' +
        '\n' +
        '3. Условия обработки персональной информации Клиентов и её передачи третьим лицам\n' +
        '\n' +
        '3.1. Исполнитель хранит персональную информацию Клиентов в соответствии с внутренними регламентами конкретных сервисов.\n' +
        '\n' +
        '3.2. В отношении персональной информации Клиента Исполнителем сохраняется ее конфиденциальность.\n' +
        '\n' +
        '3.3. Исполнитель вправе передать персональную информацию Клиента третьим лицам в следующих случаях:\n' +
        '\n' +
        '3.3.1. Клиент выразил согласие на такие действия;\n' +
        '\n' +
        '3.3.2. Передача необходима для исполнения договора с Клиентом;\n' +
        '\n' +
        '3.3.3. При использовании Клиентом сервиса безналичной оплаты на сайте Исполнителя. В этом случае персональная информация Клиента может передаваться в организацию, осуществляющую платежи;\n' +
        '\n' +
        '3.3.4. Передача предусмотрена законодательством РФ в соответствии с установленными законодательством требованиями;\n' +
        '\n' +
        '3.3.5. В целях обеспечения возможности защиты прав и законных интересов Исполнителя или третьих лиц в случаях, когда Клиент нарушает договор с Исполнителем, приложения к нему, настоящую Политику.\n' +
        '\n' +
        '3.3.6. В результате обработки персональной информации Клиента путем ее обезличивания получены обезличенные статистические данные, которые передаются третьему лицу для проведения исследований, выполнения работ или оказания услуг по поручению Исполнителя.\n' +
        '\n' +
        '3.4. При обработке персональных данных Клиентов Исполнитель руководствуется Федеральным законом РФ «О персональных данных».\n' +
        '\n' +
        '4. Изменение и удаление персональной информации. Обязательное хранение данных\n' +
        '\n' +
        '4.1. Клиент может в любой момент изменить (обновить, дополнить) предоставленную им персональную информацию или её часть, предоставив обновленные данные Администрации студии растяжки.\n' +
        '\n' +
        '4.2. Клиент также может потребовать удалить предоставленную им в соответствии с условиями договора информацию в случае расторжения такого договора.\n' +
        '\n' +
        '4.3. Права, предусмотренные пп. 4.1. и 4.2. настоящей Политики могут быть ограничены в соответствии с требованиями законодательства. В частности, такие ограничения могут предусматривать обязанность Исполнителя сохранить измененную или удаленную Клиентом информацию на срок, установленный законодательством, и передать такую информацию в соответствии с законодательно установленной процедурой государственному органу.\n' +
        '\n' +
        '5. Меры, применяемые для защиты персональной информации Клиента\n' +
        '\n' +
        '5.1. Исполнитель принимает необходимые и достаточные организационные и технические меры для защиты персональной информации Клиента от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий с ней третьих лиц.\n' +
        '\n' +
        '6. Изменение Политики конфиденциальности. Применимое законодательство\n' +
        '\n' +
        '6.1. Исполнитель имеет право вносить изменения и дополнения в настоящую Политику конфиденциальности. Новая редакция Политики размещается на сайте и информационном стенде студии растяжки.\n' +
        '\n' +
        '6.2. К настоящей Политике и отношениям между Клиентом и Исполнителем, возникающим в связи с применением Политики конфиденциальности, подлежит применению право Российской Федерации.',
        'data_transfer': 'Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платежный шлюз ПАО СБЕРБАНК. Соединение с платежным шлюзом и передача информации осуществляется в защищенном режиме с использованием протокола шифрования SSL.\n' +
        'В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей Verified By Visa или MasterCard SecureCode для проведения платежа также может потребоваться ввод специального пароля.\n' +
        'Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой персональной информации обеспечивается ПАО СБЕРБАНК. Введенная информация не будет предоставлена третьим лицам за исключением случаев, предусмотренных законодательством РФ. Проведение платежей по банковским картам осуществляется в строгом соответствии с требованиями платежных систем МИР, Visa Int. и MasterCard Europe Sprl.'
    }

    titles = {
        'contacts': 'Контакты',
        'about': 'О нас',
        'refund': 'Возврат средств',
        'contract': 'Договор присоединения',
        'payment': 'Процесс оплаты',
        'rules': 'Правила посещения занятий по физической культуре и спорту',
        'confidential': 'Политика конфиденциальности',
        'data_transfer': 'Описание процесса передачи данных'
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
            >
                <DialogTitle>{this.titles[this.props.type]}</DialogTitle>
                <DialogContent>
                    <Typography className="pre-line">
                        {this.texts[this.props.type]}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleDocumentDialogClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default DocumentDialog;