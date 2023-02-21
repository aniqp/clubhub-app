create DATABASE clubhouse;

-- Create users table
CREATE TABLE `users` (
	`uid` VARCHAR(255),
	`name` VARCHAR(255),
	`email` VARCHAR(255),
	PRIMARY KEY (`uid`)
);

-- Create clubs table
CREATE TABLE `clubs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
	`categories` TEXT,
	`description` TEXT,
	PRIMARY KEY (`id`)
);

-- Create memberships table
CREATE TABLE `memberships` (
	`uid` VARCHAR(255) NOT NULL,
	`club_id` INT NOT NULL,
	`role` ENUM("pending", "user", "admin", "owner"),
	`title` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`uid`,`club_id`),
	FOREIGN KEY (`uid`) REFERENCES users(uid),
	FOREIGN KEY (`club_id`) REFERENCES clubs(id)
);

-- Populate clubs table with clubs from WUSA
INSERT INTO `clubs` (name, categories, description) VALUES ("A Cappella Club","creative-arts-dance-and-music","The UW A Cappella Club is the umbrella club of all a cappella groups at the University of Waterloo! UWACC was founded in 2008 originally with one ensemble and has since expanded to include many different groups including the AcaBellas, the Unaccompanied Minors, ACE, the Musical InterDudes, the Water Boys, and In Full Colour. 

The Water Boys
The Water Boys is a lower-voice auditioned group.
E-mail: waterboys.acappella@gmail.com
YouTube: http://www.youtube.com/waterboysacappella
Facebook: https://www.facebook.com/waterboysuw/
Instagram: @waterboysuw
Twitter: @WaterBoysUW

The Unaccompanied Minors
The Unaccompanied Minors is a mixed-voice auditioned group.
Email: uw.unaccompanied.minors@gmail.com
YouTube: http://www.youtube.com/user/UnaccompaniedMinorUW
Facebook: https://www.facebook.com/minorsacappella
Instagram: @uw.unaccompaniedminors
Twitter: @MinorsACappella

The AcaBellas
The AcaBellas is an upper-voice auditioned group.
Email: the.acabellas@gmail.com
YouTube: http://www.youtube.com/theacabellas
Facebook: https://www.facebook.com/UWacabellas/
Instagram: @uwacabellas
Twitter: @TheAcaBellas

ACE
A Cappella Ensemble (ACE) is a mixed non-auditioned group.
Email: uwaterlooace@gmail.com
YouTube: http://www.youtube.com/uwacappellaensemble
Facebook: https://www.facebook.com/uwaterlooace/
Instagram: @uw_ace

The Musical InterDudes
The Musical InterDudes is a small mixed-voice auditioned group focused on musical comedy.
Email: MusicalInterdudes@gmail.com
YouTube: https://www.youtube.com/channel/UClxfv2PBjdj8abGQEiKEeVQ
Facebook: https://www.facebook.com/TheMusicalInterDudes/
Instagram: @themusicalinterdudes

In Full Colour
In Full Colour is a mixed-voice auditioned competitive small group focused on storytelling.
Email: uw.infullcolour@gmail.com
YouTube: https://www.youtube.com/channel/UC3T71M7qnoYXBARldcOgVyQ
Facebook: https://www.facebook.com/infullcolouracappella
Instagram: @infullcolouracappella

Typically, auditions are held at the start of term. During the term, social events are held as well as workshops run by club members and professional musicians. The term ends off with the End of Term (EOT) concert held at one of the theatres on campus. Groups typically practice 1-2 times a week and learn around a 10-15 minute choreographed set for the EOT concerts. Outside of the EOT concerts, there are numerous performance opportunities on campus and within the KW area where the groups get to interact with the community at large.

For further details on JOINING or PERFORMANCE REQUESTS, please email the groups directly, or email uw.a.cappella.club@gmail.com. We look forward to singing with you!


uwacc.com
uw.a.cappella.club@gmail.com
http://www.facebook.com/UWACC
http://www.youtube.com/user/uwacappellaensemble
https://instagram.com/uwacc "
),
("ACE - A Cappella Affiliate","creative-arts-dance-and-music","ACE is a mixed-voice, open a cappella group in the UW A Cappella Club running both in Waterloo and online remotely! We accept all members of all levels of musical experience. We provide musical development workshops and guide members through learning how to sing in an a cappella group, culminating in several gigs and online song productions at the end of each term! Find out more by visiting our Instagram (@uw_ace) and joining our discord server (DM us on instagram for the link)!"
),
("African Student Association (ASA)","cultural","We are a group of students of African origin who hope to promote African culture and interaction. Membership is open to all students who wish to interact with African students and learn and experience our rich and diverse cultures. We also provide an environment for students to socialize and air their views on Africa. Africa is a very diverse continent with some countries consisting of more than 50 tribes! We have representatives from all regions of Africa giving us a broad background within the club. We organize a number of events where people can experience the warmth of the African sun and learn more about our continent. Please check our social media accounts for upcoming events or send us an email with any comments or questions at uow.asa@gmail.com."
),
("AfroXDance Club","creative-arts-dance-and-music,cultural,games-recreational-and-social","The Afro-Fusion dance club  is aimed at bridging the gap between cultural and traditional African dance styles and other genres of dance; hip-hop, contemporary, jazz, salsa, etc. The club will serve as a creative space for dancers from all backgrounds who wish to learn more about African dance styles and connect with their African dance roots. Each class promises to be filled with fun and learning in addition to being a great total body workout!"
),
("Ahmadiyya Muslim Students'' Association (AMSA)","religious-and-spiritual","The purpose of this club is to provide necessary guidance and/or counselling to its members in matters relating to social, cultural, academic and religious importance and to provide assistance beyond counselling where it will be necessary. Furthermore, through his personal example of benevolent behavior, each member of AMSA at UWaterloo will strive to portray the true life of an Ahmadi Muslim."
),
("Animal Rights Society","charitable-community-service-international-development","We discuss animal rights related topics, advocate for animal rights on campus and in the Waterloo community and meet like-minded people. We run events such as vegan bake sales, fur-free pledges, vegan cooking classes, farm sanctuary trip, coffee giveaway, farmers market trip, weekly meetings, halloween candy giveaways, activism panel, vegan cheese giveaway, cruelty free booth, and any related events. Initiatives would include advocating for more vegan options on campus through the UW Food Services survey."
),
("Animusic Ensembles","creative-arts-dance-and-music","Animusic Ensembles is a group of musicians dedicated to playing music originating from primarily anime and video game soundtracks. Our ensemble accepts all instrumentalists. Arrangements are created by members and performed by groups of varying size and instrumentation.

For additional information, feel free to email uw.animusic@gmail.com"
),
("Ascend Canada Waterloo Chapter","academic,business-and-entrepreneurial,cultural","Ascend was started to address the shortage of Asian leaders in Corporate America and broadened its horizons to Canada in 2012, with a mission to be the premier professional organization dedicated to enabling its members, business partners and the community to leverage the leadership and global business potential of Pan-Asians.

With the support of 18 corporate sponsors such as TD, Deloitte, Manulife, Ascend looks to develop pan-Asian leadership potential across North America starting with when members are in school to provide career long relevance. Ascend will help set students up for long-term career success through mentoring and guidance, offering a platform to build connections with senior leaders across multiple industries and functions. 

Membership spans across various industries and multi-national companies and is open to individuals of all ethnic and business backgrounds."
),
("Association of Caribbean Students","cultural","The Association of Caribbean Students (ACS) at the University of Waterloo is a social club that is dedicated to the promotion of Caribbean culture and cultural unity in general within the University Community. Within ACS, students born in the Caribbean will be able to experience and enjoy an atmosphere in which they can relax and feel at home. Students not born in the Caribbean, but with Caribbean background will find a place where they can find out more about their ancestry, homeland and culture. Students with no Caribbean background will have the opportunity to discover more about a unique culture and participate in activities and events that they might not have otherwise been able to experience. The ACS provides entertainment and educational value to students of all backgrounds."
),
("Association of Korean Canadian Scientists and Engineers","academic","AKCSE is a non-profit organization to support sharing scientific knowledge between Korean-Canadians and setting up connections between Korea and Canada for further development. Our organization promote the application of science and technology for the general welfare of society, help KoreanCanadian scientists and engineers develop their full career potential in both Canada and Korea, and serve the Korean community by delivering scientific and technological information. Although the target audience is focused around scientists and engineers, individuals of any faculty are welcome to join, as we hold academic and social events aimed to benefit all of the student body at the University of Waterloo. "
),
("Assyrian Chaldean Syriac Student Union","charitable-community-service-international-development,cultural,games-recreational-and-social,political-and-social-awareness","The Assyrian Chaldean Syriac Student Union (ACSSU) at the University of Waterloo serves to promote and educate others on Assyrian Chaldean Syriac culture and heritage, raise awareness on human rights issues, and support those in need. We would like to create a community at UW that is aware and appreciates the history and culture of all students. To achieve these goals and strengthen ties within the ACS community we plan to hold fundraisers, social outings, community education seminars, cultural networking opportunities, and social justice and cultural events. "
),
("Aviation Society","academic,business-and-entrepreneurial","The University of Waterloo Aviation Society aims to represent and provide opportunities for University of Waterloo Aviation Students, as well as foster a community for those interested in Aviation."
),
("Bengali Students Association (BSA)","cultural","no description"
),
("Beyond Ideas Club","academic,business-and-entrepreneurial,charitable-community-service-international-development,cultural,environmental-and-sustainability,games-recreational-and-social,health-promotion,media-publications-and-web-development,political-and-social-awareness,religious-and-spiritual","This club aims to discuss issues  and propose well thought-out solutions in Modern Politics and conduct research into current and historic consequences of policies. Unlike most political clubs we like to form a community of intellectuals that engage in conflict with personal world views by discussion and learning. As intellectuals we heavily base our arguments and proposed solutions on academic research rather than blatant opinions.  We are Waterloo students that enjoy critical thinking and we belong to a variety of majors at University of Waterloo. The club members are heavily invested in Philosophical thinking and often propose solutions to modern politics via rational thinking. "
),
("Big Spoon Lil Spoon","charitable-community-service-international-development,political-and-social-awareness","Big Spoon Lil Spoon (BSLS) was founded at Queen’s University and aims to provide mentorship to children with exceptionalities. BSLS pairs up children with student mentors throughout the year. The unique program features cooking classes, life-skill workshops and employment programs for children with special needs. BSLS members will be able to form their own subcommittees to carry out personalized projects that aim to support children with exceptionalities. 
"
),
("Black Association for Student Expression,UW (UW BASE)","cultural","UW BASE stands for the University of Waterloo Black Association for Student Expression. We seek to provide students with an establishment that offers peer mentorship and community outreach initiatives; promote diversity, cultural enlightenment and a heightened understanding of black people and black culture; act as a medium for students to express themselves and to foster a stronger identity within the university demographic; welcome, respect, love and appreciate people of all colours, backgrounds and mixes thereof

We host events such as Fever: Annual All Ages Throwback, the ""One Seed. Many Roots,"" Black History Month Series, Afro Day, A.C.E with BASE Networking event, Grill and Chill and numerous other educational and social events."
),
("Black Medical Leaders of Tomorrow","academic,health-promotion,political-and-social-awareness","Encourage and assist black undergraduate and graduate students who wish to pursue medicine in order to increase the number of black students who apply to medical school and thereby increasing the overall number of black physicians"
),
("Brain Exercise Initiative","charitable-community-service-international-development,health-promotion","The Brain Exercise Initiative is a student run, volunteer based club that uses math, reading and writing as a form of cognitive development for the elderly. It is found that simple math exercises and reading aloud for just 30 minutes a day 5 days a week can have a positive impact on memory for those with Alzheimer''s. This is currently being done extensively in Japan. It was discovered by a Japanese neuroscientist, Ryuta Kawashima, and consists of math exercises and reading aloud of short stories. Done for just 30 minutes a day, 5 times a week, improvements in Alzheimer’s patients have been observed. This initiative is based at local retirement homes in our community. "
),
("Breakers,UW","creative-arts-dance-and-music","The UW Breakers promotes hip hop culture and break dancing as a fun and exciting activity for students and others as a form of self-expression and as an opportunity to get to know one another. The club mainly hosts a weekly open practice that is open to all levels of dancers to learn and practice breaking. Occasionally, UW Breakers will host a dance battle for members who are interested in competition and this part of breaking culture."
),
("Buddha''s Light Community Club, UW","religious-and-spiritual","1. To encourage the understanding of Buddhism, particularly Mahayana Buddhism and Humanistic Buddhism and to promote the application of the Buddhist principles of kindness, compassion, joy, and equanimity to our daily lives. 
2. To organize meetings and social gatherings to discuss Buddhism-related topics. 
3. To provide a friendly environment for spiritual development to the members of the University who are interested in learning Buddhism and meeting with other Buddhists. 
4. To provide an opportunity for students to improve their skills on event organization, leadership, newsletter publishing, and website development."
),
("Campus Association for Baháʼí Studies at UW (CABS)","religious-and-spiritual","Campus Association for Baha''i Studies (CABS) is the UWaterloo club associated with the Baha''i Faith, a religion founded by Baha''u''llah whose central purpose is to establish the oneness of humanity.

The purpose of CABS is to gather friends of all backgrounds to deepen on the teachings of God and the history and philosophy of the Baha''i Faith; as university students, to learn how to be of service to humanity in all the different aspects of our lives.

Examples of events we hold are devotionals and study sessions. Devotional gatherings consist of reading prayers and passages from religious texts in an informal and reverent atmosphere followed by thoughtful discussion. Study sessions are more structured spaces to explore the Baha''i perspective on varying subjects. They involve research, lively consultation and an open mind in order to redefine our understanding of our material and spiritual realities."
),
("Campus Crusade for Cheese","games-recreational-and-social","Weekly meetings: Tuesdays, 6pm-7pm  at Hagey Hall 138

The purpose of the CCCh is to offer an outlet for students, faculty, staff, and Alumni who enjoy cheese or wish to enjoy cheese. We have activities such as eating cheese, talking about cheese, rating cheese, cheese related news, current cheese events, and more. Cheese plates may include other things aside from cheese such as crackers and meats.

Follow us on Instagram @campus.crusade.for.cheese or email us at ccch.uw@gmail.com."
),
("Chess Club, UW","games-recreational-and-social","Welcome to another great term at UW Chess Club. We wish to provide an environment where people throughout the Kitchener-Waterloo Region can enjoy the game and share their love for chess through discussions and strong tournaments for all levels. We provide a mentorship program for beginners who are intent on getting better as well as casual play with your friends and teachers.

We are pleased to inform that we have established Kitchener-Waterloo Chess Club as our co-sponsor."
),
("Chinese Christian Fellowship, UW","religious-and-spiritual","The Chinese Christian Fellowship (CCF) is a campus group of culturally diverse Christians who meet together regularly to: be a visible and effective witness for Jesus Christ on this campus, provide an environment of mutual support that will enable students to discover their potential and the true meaning of life within the context of university as well as after graduation, encourage its members to practice genuine Christian love, and help students integrate into local churches."
),
("Chinese Students Association (CSA), UW","cultural","The University of Waterloo Chinese Students’ Association (UWCSA) was established in 1974 with a vision of bringing awareness to the Chinese culture and community. After its establishment, UWCSA has expanded to serve hundreds of members. 

Being the largest Chinese cultural club at the University of Waterloo, we aim to connect and unite the diverse Chinese students at our institution, and in the process, contribute to multiculturalism throughout our university.

UWCSA is widely renowned for its planning and execution of multiple successful events and activities each term. We host a variety of events, such as contests, outdoors events, and social nights to facilitate and foster communication between our members and the general student body. We also organize joint events with other clubs (including those outside of the University of Waterloo) to extend our culture to others.

In the future, the members of UWCSA are hoping to grow with one another, creating an organization that is successful and beneficial to all students at the University of Waterloo.

https://linktr.ee/uwcsa
https://www.facebook.com/UWaterlooCSA
https://www.tiktok.com/@uwaterloocsa
https://discord.com/invite/U4AkBZRPvZ"
),
("Christian Orthodox Campus-Ministry Association","religious-and-spiritual","OCF is charged with connecting Orthodox college students—and those interested in the Orthodox Christian faith—to Christ and His Church. OCF realizes this mission by:

- Supporting members'' experience and witness to the Orthodox Christian Church through community life, prayer, service to others, and study of the Faith

- Providing a variety of thoughtful and innovative programming including College Conference and Real Break domestic and international service projects
"
),
("Club That Really Likes Anime (CTRL-A)","games-recreational-and-social","Celebrating 20 years, CTRL-A is an organization that promotes interest in animation, pre-dominantly of Japanese origin. A social club first and foremost, our membership is open to anyone with an interest in anime, gaming, and any other related topics. We hold on-campus events, with general meetings traditionally held once a week, anime screenings several times a term, in addition to other special events, such as karaoke and a cosplay cafe."
),
("Concert Band, UW","creative-arts-dance-and-music","UW Concert Band Club is a club for people who loved those concert band days in high school, or even elementary school! Our unauditioned concert band presents an opportunity for musicians from all faculties and programs to maintain their musical skills while having fun in a supportive atmosphere.
We practice weekly in DC 1350 or 1351, check out our site below for more information about the current term or email us to get in the know!

linktr.ee/uwcbc"
),
("Contact Lens Interest Club (CLIC)","academic,health-promotion"," We are a student-run organization with the goal to encourage and promote
collaboration in the field of contact lenses between undergraduate optometry students and graduates in vision science at the University of Waterloo School of Optometry and Vision Science. The aim of the club is to expose students to the most up-to-date and common practices in contact lenses. This will be done through providing information on current research papers and clinical practices with journal club workshops to explore and discuss contact lens research, as well as
guest lectures from experts in the field. "
),
("Cooking Club, UW","games-recreational-and-social","The Cooking Club serves up cooking classes, bake sales, barbeques, and other food related adventures. We cover the full spectrum of foods from fancy sushi rolling classes to quick and dirty tips to help you manage the necessary evil known as ‘cooking during midterms’.  When we’re not in the kitchen or hosting our famous classes, we occasionally venture out to the real world to visit coffee roasters, picnic areas, strawberry fields, or bonfire pits. If we’re not doing any of the above, our members are usually busy trying to craft an amazing burger or a cupcake to sell at one of our barbeques or bake sales to help fuel the culinary debauchery."
),
("Crafts 4 Charity","charitable-community-service-international-development,creative-arts-dance-and-music","We are a UW DIY campus club that seeks to spark creativity. Every term we host a couple of workshops teaching you how to make cute plushies, polymer clay charms, and more- we will provide the materials and instructions, all levels are welcome! We often sell our handmade crafts to raise money for various charities, so keep your eyes peeled for us on campus!"
),
("Creative Writing Club","creative-arts-dance-and-music,games-recreational-and-social,media-publications-and-web-development","Write your imagination out at Waterloo''s Creative Writing Club! Whether you write novels, short stories, poetry, song lyrics, essays, or plays, we offer a fun and friendly environment for everyone. Drop by for writing sessions, community socials, workshops, writing contests and collaborative projects!"
),
("Creators Collective","business-and-entrepreneurial,creative-arts-dance-and-music,media-publications-and-web-development","The Creators Collective is a club that supports students'' creativity at the University of Waterloo! We hold an annual gallery and have a printed magazine showcasing all forms of student art as well as a market that provides a single source to find products and services provided by our own students. Creators Collective hosts events throughout the year that target to establish and create a sense of community between creators."
),
("Culture and Language Exchange Club, UW","charitable-community-service-international-development,cultural","The purpose of this club is to promote the exchange of language and culture between students by forming small study groups. With the multicultural student body of UW, we are able to match up each student''s preferred language to learn with other students who are knowledgeable in that language and can teach. This club compliments the academic languages courses nicely, and provide an opportunity to learn languages in a fun manner. Individual sessions will focus on improving the individual''s speaking, listening and writing (grammar & spelling) skills through lectures as well as fun activities incorporating students’ hobbies and interests. This also serves as a great opportunity to prepare students who wishes to participate in foreign exchange programs."
),
("Debate Society, UW (Debating Association)","academic,political-and-social-awareness","Our purpose is to hone our skills for competitive debate, within the CUSID (Canadian University Society for Intercollegiate Debate) and beyond. We do this through lessons on improving debate and public speaking, attending/hosting intercollegiate debate tournaments, socials and other events. "
),
("Deception Board Games Club","games-recreational-and-social","We love playing deception games such as Avalon, Coup and Battlestar Galactica! Join our Facebook group to vote on when we meet up to play or send us an email with any questions."
),
("DJ Club, UW","creative-arts-dance-and-music","UWDJ Club is about bring together the UW DJ community. It is about all forms of DJing. People who DJ, those who want to learn, and those who just like the music. Want to know more? Check out the website, or drop us a line at our e-mail address.

Every week the DJ Club is planning to come together to share knowledge and expertise. We hope to bring turntables, mixer, and small PA into the lower atrium to play. The plan is to rotate between hip hop and electronic forms of music allowing various DJs in the UW community to share with one another."
),
("Effective Altruism Club","charitable-community-service-international-development,political-and-social-awareness","Effective Altruism is a global movement dedicated to making a positive impact on the world in the most effective way possible. This involves not only caring about making a difference, but also thinking critically and finding evidence-based approaches to improving the world. The Waterloo Effective Altruism Club is for altruistically motivated students to learn more about how they can spend their limited time and money to have the largest impact possible. Students can also get to know like-minded individuals to network and share ideas."
),
("enTECH Computer Club","charitable-community-service-international-development,media-publications-and-web-development","We improve the technological literacy of seniors by going to senior homes and teaching technology use, creating programs to make technology more accessible and easy to use, and creating instruction documents for others to use."
),
("Euchre Club, UW","games-recreational-and-social","The purpose of our club is to give experienced Euchre players an organized, competitive level of euchre play, while providing new players with a fun environment in which to learn the game of Euchre. 

We have weekly meetings where you can meet new people, socialize, and enjoy the great game of Euchre.

There is a $5 membership fee for joining the UW Euchre Club for a term. This fee covers weekly snacks/drinks and tournament prizes.

 "
),
("Fashion for Change","charitable-community-service-international-development,creative-arts-dance-and-music","Fashion for Change is a non-profit organization that unites students at the University of Waterloo, Conestoga College and Wilfrid Laurier University to host the largest student-run charity fashion show in the K-W region. Over the past 10 years as a club, we have raised over $125,000 for charity! With over 130 executives and models yearly, our family is full of passionate students that use our talents to change the world! We use fashion, dance, film, music, and other mediums to promote artistic expression."
),
("Fighting Game Club (UWFGC)","games-recreational-and-social","The University of Waterloo Fighting Game Club caters to Fighting Game players of all kinds! We are a casual to a semi-competitive club that plays a wide variety of Fighting Games including Street Fighter, Tekken, Guilty Gear, Blazblue, UNICLR, and much more!

Join our Discord for all the latest information."
),
("Filipino Students'' Association, UW","cultural","The University of Waterloo Filipino Students'' Association is a club driven to help educate Filipinos and Filipinos-at -heart about the Filipino culture. Not only to gather for social occasions, but to create a tight-knit community sharing our many talents and resources.

Get in touch with us!
Email: uwfsa@clubs.wusa.ca
Instagram: https://www.instagram.com/uwaterloofsa/
Discord: https://discord.gg/BdsRAHx8
Facebook: https://www.facebook.com/uwfsa
Tiktok: https://www.tiktok.com/@uwfsa
YouTube: https://www.youtube.com/uwaterloofsa"
),
("Films, UW (Former Films Creator Club)","creative-arts-dance-and-music,games-recreational-and-social,media-publications-and-web-development","The film making center at the University of Waterloo."
),
("Finance Association (WIREX/Capital Markets), UW","business-and-entrepreneurial","UW Finance Association (UWFA) was formed in May 2011 as the continuation of two established finance clubs, WIREX and UW Capital Markets Group. UWFA aims to introduce new students to finance through the use of tutorials, guest speakers, information sessions and forums. UWFA supports the career development of all students through various workshops, events, and provides networking opportunities between members and industry professionals."
),
("Geriatric Pharmacy Club","academic,health-promotion","Geriatric Pharmacy Club at the School of Pharmacy in Kitchener serves to create advocacy and educational opportunities for pharmacy students, with an ultimate goal to empower seniors and their caregivers to take a more active role in maintaining their health and quality of life. In order to also benefit the KW community at large, we plan to collaborate with various community organizations and involve non-pharmacy individuals in some of our initiatives.
"
),
("Global Brigades - Public Health Brigades","charitable-community-service-international-development","no description"
),
("Greek Council (formerly FSA)","academic,charitable-community-service-international-development,cultural,games-recreational-and-social,political-and-social-awareness","UWaterloo Greek Council is an umbrella organization that collectively represents all the Fraternities and Sororities at UWaterloo.   Greek Life is a community where we strive to improve our school and community by hosting philanthropic events and supporting school events. Strong bonds and lifelong friendships also formed within individual chapters and the Greek community in general. Come out to a Greek Council meeting and see what it''s all about!"
),
("Gujarati Students Association (GSA)","cultural","The University of Waterloo’s Gujarati Student Association (GSA) is a club that aims to foster a community to curate cultural expression for the Waterloo body. This club intends to make Waterloo faculty members and students feel connected with each other through their ethnic groups. We want to promote Gujarati culture by organizing a variety of cultural events, workshops, and activities. This club aims to create a safe environment where everyone can feel comfortable and respected through enjoyment and interactions with others. 
You can get in touch with us by emailing gsauwaterloo@gmail.com or messaging on our Instagram page: @uw.gsa."
),
("Hemoglobal Waterloo","charitable-community-service-international-development","Hemoglobal Waterloo aims to improve the health of children affected by fatal blood diseases in Asia. We strive to make care fair by working to provide all children, regardless of birthplace, with the treatment options that are available in higher-income countries. Hemoglobal Waterloo will try to combat some of these health inequities by raising money and hosting events to garner support for our goal of making care fair. "
),
("Hera.co","business-and-entrepreneurial,games-recreational-and-social,media-publications-and-web-development,political-and-social-awareness","We are a non-profit organization that aims to build a female supporting female community founded in 2021. We realize the importance of peer support and community bond for each individual’s road to success. That’s why we are founded here to support our future aspiring leaders. Our mission is to empower young women to grow the ambition, bravery, confidence, and self-leadership to pursue their passion."
),
("Her Campus Waterloo","business-and-entrepreneurial,games-recreational-and-social,media-publications-and-web-development,political-and-social-awareness","Her Campus Waterloo is a chapter of Her Campus which ""is the #1 media site for college women, written entirely by the world’s top college journalists."". We are an online magazine targeted towards female collegiates written by college journalists focused on a variety of topics ranging from entertainment, culture, food, sex and relationships, fashion, etc.! 

About Her Campus: https://www.hercampus.com/about-us "
),
("Hillel Waterloo","religious-and-spiritual","Hillel Waterloo strives to inspire every Jewish student in Waterloo to make an enduring commitment to Jewish life, learning, and Israel. Through promoting Jewish identity, cultivating student leadership and embracing religious and political diversity in an inclusive environment, Hillel Waterloo will enrich the lives of students on campus. 

We embody this mission and vision through our on-campus activities which range in content from Israel engagement, education, and advocacy opportunities, to social interactions, to community service and social justice, and to Jewish educational encounters. 

In addition to our events, we also strive to connect students with other religious groups in the Waterloo community by running joint events. All of our events are open to Jews and non-Jews alike as well as individuals from all walks of life, all we ask is that they have an interest in what we are doing. All of our events are advertised through our website, Facebook page, email newsletters, as well as in-person interactions."
),
("Hindu Students Council at the University of Waterloo","religious-and-spiritual","The Hindu Students'' Council (HSC) is an international forum that provides opportunities to learn about Hindu heritage through various activities, events and projects. HSC presents ample opportunities for self-development at the spiritual and professional level.

Our main goal is to provide a forum with which Hindus, on and off campus, can celebrate being Hindu and Hinduism through a variety of religious and cultural events. We work to provide these basic services to the University of Waterloo so that the Hindu community at UWaterloo, and those interested in Hinduism, may have the opportunity to take part and experience the rich and vibrant Hindu culture.

But don’t be intimidated. Just because you’re not Hindu doesn’t mean that you can’t join HSC and take advantage of all the services and events that we offer. One of the main goals of the Hindu Students’ Council is to provide a forum for those who aren’t Hindu, giving them an opportunity to experience the culture, the food, and the teachings in a social environment. We always love seeing new faces and hearing different viewpoints and similarities with various ethnic groups. Everyone is welcome from all walks of life!"
),
("Hip Hop, UW","creative-arts-dance-and-music,games-recreational-and-social","The purpose of The University of Waterloo Hip Hop Club is to provide a fun, social environment where students can learn hip hop dance. Members of the club have the opportunity to grow as dancers by being exposed to different styles of hip hop dance, while meeting others who are passionate about dance. Practices help members to develop balance, coordination, strength and confidence.

UWHH is open to anyone and everyone willing to learn. Students of any experience level are welcome! Members range from inexperienced dancers to dancers at the advanced level.

No audition is required to be a part of the club. Any member may perform with UWHH at events and competitions throughout the term as long as they can commit to attending the practices."
),
("Hong Kong Students'' Association","cultural,games-recreational-and-social","UWHKSA is a club for those who are interested in Hong Kong culture. Our goal is to strengthen the Hong Kong community within the University of Waterloo and to promote Hong Kong culture and Cantonese."
),
("Humans vs. Zombies Society","games-recreational-and-social","Humans vs. Zombies is a game of tag between two teams where Humans have to defend themselves with Nerf blasters and socks to survive as long as they can against a growing Zombie horde out to tag them. Humans vs. Zombies Society runs a weeklong game per term as well as weekend minigames and an annual open invitational game.

Join our Discord server today: https://discord.gg/HFEd8hpJAb"
),
("Impact Alliance","academic,charitable-community-service-international-development,environmental-and-sustainability,media-publications-and-web-development","Impact Alliance is the Sustainable Development Goals (SDG) Student Hub for the University of Waterloo. Directly affiliated with the Sustainable  Development Solutions Network Youth (SDSNY), the hub educates, engages, and takes action on the United Nations'' 17 SDGs."
),
("Improv Club, UW","games-recreational-and-social","UW Improv meets every week for games, exercises, sports and warfare from the world of *improvisational drama*, made famous by Whose Line is it Anyway. Our objectives are fun, enjoyment and belly laughs-- no experience necessary, drop-ins welcome!

Also available is a Performance Team, which is compiled at the beginning of every semester-- auditions take place during the first few weeks of a new semester."
),
("Indian Cultural Association, UW","cultural","UW Indian Cultural Association is a club that aims to promote Indian culture to the staff and students at the University of Waterloo by organizing various cultural events and dance performances. This club aims to provide a comfortable space where students and staff of Indian origin and/or students interested in Indian culture can come together and enjoy each others company."
),
("In Full Colour - A Cappella Affiliate","creative-arts-dance-and-music","In Full Colour is an auditioned, mixed voice ensemble created and maintained for the purpose of performing through contemporary a cappella music and storytelling. Above all, In Full Colour is an organization dedicated to having fun through the making of quality music, specifically of the genre of contemporary a cappella. In Full Colour primarily prepares a storytelling set, to be performed in competitions, showcases, festivals, or other performances or venues as needed. "
),
("Iranian Students'' Association of Waterloo","charitable-community-service-international-development,cultural","Iranian Students’ Association of Waterloo’s mission is to unite the Iranian students at the University of Waterloo and other universities through cultural events and gatherings. ISAW provides a non-political environment where all members support one another and share ideas to improve society to its full potential. ISAW respects and supports people from all nationalities, backgrounds, identities, and origins; as well as welcoming everyone to visit any of the year-long events to become familiar with the Persian culture and background."
),
("Jamnetwork","academic,creative-arts-dance-and-music,games-recreational-and-social","Attention University of Waterloo students...

FINALLY, there''s a space for musicians of all levels and backgrounds to come, relax, and get groovy.

Whether you''re a master jazz pianist, absolute beginner, or if you just want to learn how to play Wonderwall around a campfire, JamNetwork is the place to play. Come meet fellow music people and learn improv and theory skills along the way. (Don''t worry - you don''t need to know how to play Bohemian Rhapsody.) 

Jamnetworkuw@gmail.com

You can even just come watch and experience music. Everyone is welcome! With weekly drop-in meetings and field trips/community outings, we''re all about expanding the music scene in Waterloo. 

So come one, come all, and let''s make some magic together.
"
),
("Journal for Undergraduate Health Research (JUHR)","academic,environmental-and-sustainability,health-promotion,media-publications-and-web-development","The Journal of Undergraduate Health Research aims to promote undergraduate research while integrating all fields across health research. We seek to provide opportunities to undergraduate students at UW to publish peer-reviewed works. Works accepted for publication may include, but are not limited to, the following topics as they relate to human health: health studies, biomedical sciences, public and population health, kinesiology, recreation and leisure. Undergraduate students from all faculties at UW are welcome to submit work to the UW Journal of Undergraduate Health Research."
),
("Karol Wojtyla Club","religious-and-spiritual","We are of the conviction that the legacy and spirituality of Karol Wojtyla (Pope John Paul II) represents a strong moral and spiritual compass to guide and enhance the life goals of similarly minded young adults.  The late pope’s unprecedented special relationship to young people in virtually every country of the world has inspired devotion in millions who, in turn, continue to instruct the next generation in his teachings.  He is recognized as an agent of convicted and compassionate political transformation, and his teaching is a beacon of hope for forming loving, life-giving societies that celebrate what is truly good in all the world’s cultures.  His three visits to Canada have left long-lasting impressions upon hundreds of thousands of Canadian young people, and the events and speeches from those visits continue to inspire.  We are of the opinion that the body of literature and teaching that emanate from this great saint warrant special intention, and that his admirers merely need a structure in which to join others of like mind."
),
("Kingdom Come - A Ministry of Power to Change – Students","religious-and-spiritual","We are a campus movement dedicated to helping students discover Jesus. As part of a larger organization called Power to Change, our primary focus is to help university & college students across Canada experience God’s love and forgiveness and to inspire them to influence others to become lifelong followers of Jesus.

Stay updated on our events by following our Instagram (@kc_waterloo) or by joining our Facebook group (kcwaterloo).

Learn more about Kingdom Come on our website (kingdomcome.ca), Facebook page (@kingdomcomekc), or YouTube channel (KingdomComeKC)."
),
("Korean Christian Fellowship","religious-and-spiritual","We are a community of students passionate about knowing God and participating in his work on campus and in the world. Together we pursue transformation through Scripture to lead and equip others to join in Jesus'' extraordinary revolution. 

Whether you are a Christian, curious, or simply exploring who Jesus is, we would love to help you get plugged into our community! We have small groups, prayer times, and bible studies happening throughout the week and regular large groups on Fridays where we gather for a time of worship and fellowship. "
),
("Low Vision Interest Group","academic,health-promotion","Low Vision Interest Group is an Optometry student group that provides educational and experiential learning opportunities aimed at increasing awareness of low vision practices and rehabilitation."
),
("Make-A-Wish UWaterloo Chapter","charitable-community-service-international-development","Make-A-Wish is a non-profit organization that was pioneered in Arizona, USA and has been ever since working effortlessly towards creating wishes for children with critical illnesses. It is the world’s leading children’s wish-granting organization and serves every community in Canada. Since 1983, Make-A-Wish Canada has granted over 36,000 wishes across the country and has been working efficiently to grant even more in the coming years. As Make-A-Wish foundation is a non-profit it relies on donations and grants which is what this club would aim for. 

Make-A-Wish UWaterloo Chapter is an affiliation of the Make-A-Wish foundation Canada and operates solely to raise funds via multiple fundraising/charity events. By being a part of this club you would not only be contributing your time and efforts towards a better cause but would also be a significant member of society by working towards a better future for all. 
"
),
("Mambo Club","creative-arts-dance-and-music,games-recreational-and-social","The objective of Mambo is to teach international salsa dancing to the UW community. We provide weekly lessons and practice sessions in a friendly, social, and relaxed environment where dance enthusiasts of all levels can participate. Check out www.mamboclub.ca for more details."
),
("Mandarin Chinese Christian Fellowship","cultural,religious-and-spiritual","We worship God and do bible study in order to learn the word of God through speaker nights, praise and worship nights, movies, and Bible studies."
),
("Marketing Association, UW","business-and-entrepreneurial","UWMA is Short for University of Waterloo Marketing Association. UWMA fosters student interest in marketing and self-branding alongside providing services to local ventures and individuals. With the help of our leaders, sponsors, and general members we are driving towards being a professional marketing group within the next few years."
),
("MEDLIFE UW","charitable-community-service-international-development","MEDLIFE is a non-profit student organization that aims to alleviate global poverty through the distribution and promotion of Medicine, Education, and Development. With a network of over 50 chapters in universities across North America, MEDLIFE continues to grow. Get involved with local volunteering, fundraising, and international volunteering with the Service Learning Trips!

Join MEDLIFE today! "
),
("Metal KLVB, UW","games-recreational-and-social","The purpose of the club is to gather UW students to discuss and learn about metal music and its many different genres; introduce each other to new groups and learn about its history. We plan to hold meetings and social outings."
),
("Model United Nations, UW","academic","We discuss the political, social, and economic state of the world via student driven and focused debate. Using this debate, we endeavour to also expand the individual awareness of the world at large, and discover possible solutions to the issues plaguing the world and the people within. The University of Waterloo Model United Nations has at its core the goal of making its members into more aware and capable global citizens, through open debate and engagement on the issues of the world through the club''s events and initiatives."
),
("Musical Interdudes - A Cappella Affiliate","creative-arts-dance-and-music","The Musical InterDudes are a small-sized mixed-voice auditioned group with a focus on musical comedy. We consist of ✨boring✨ music practice, ✨terrible✨ socializing, and ✨fun✨ admin talk. We place a large emphasis on member input, and strive to find ways to incorporate members'' ideas into the tear producing, knee-slap inducing, rolling on the floor laughing set we create for UWACC''s end-of-term concert, gigs, and anything else you can imagine."
),
("Muslim Students'' Association (MSA)","cultural,religious-and-spiritual","The Muslim Students'' Association (MSA) at the University of Waterloo seeks to create a community that is open and dynamic, which caters to the best interests of all Muslims on campus. Our main goals are to provide an Islamic environment for the Muslims at UW, and to raise awareness of Islam among non-Muslims. We achieve these goals by providing services and support for Muslims on campus, and by organizing lectures, conferences, and Islam Awareness Weeks each term for the general UW population."
),
("Muslim Students Association - Orphan Sponsorship Program","charitable-community-service-international-development","Our main goal is to raise awareness about local and international orphans and fundraise money which will be donated to orphan sponsorship organizations. We strive together towards our goal by arranging games nights, movie nights, and general fundraising activities to raise awareness for our club. We''re always looking for enthusiastic people to join our team! Interested? Reach us through our social media or email us at uwmsa.orphans@gmail.com
"
),
("oSTEM @ UWaterloo","academic,political-and-social-awareness","oSTEM @ UWaterloo is the UWaterloo chapter of oSTEM, an international organization focused on LGBTQ+ people in STEM. We are a safe space for queer STEM students and allies to connect with peers and mentors and participate in events relating to queerness in STEM.

Join us: https://forms.office.com/r/szeTBep3Bb
Contact us: ostem@clubs.wusa.ca
Discord: https://discord.gg/Cg3R3rpKVQ
Instagram: https://www.instagram.com/ostem_uwaterloo/
Facebook: https://www.facebook.com/OSTEM-at-UWaterloo-109543378533188/
Website: https://ostem.clubs.wusa.ca/"
),
("osu! Club, UW","games-recreational-and-social","The purpose of the club is to provide an environment for members to discuss and play the rhythm game osu!. Tri-weekly meet-ups give members a place to play osu! in a multiplayer LAN setting or simply hang out, watch, and relax. Termly tournaments and contests give players and mappers of all types an opportunity to fuel their competitive spirit and test their abilities. We are a very welcoming community that encourages anybody interested in the game, regardless of skill level, to come check us out. 
"
),
("Pakistani Students'' Association","cultural","The Pakistani Student Association at the University of Waterloo is an organization that coordinates educational and social activities which promote Pakistani culture to the Waterloo community."
),
("Photography Club, UW","games-recreational-and-social","The UW Photography Club aims to promote and foster interest in the photographic medium — including, but not limited to, its artistic, photojournalistic, and technical aspects.

The club generally meets on a weekly basis for workshops, photo trips, or contests.

Sign up for our mailing list for updates,or join us on our Facebook group for discussion and Facebook page for announcements."
),
("Power to Change (Campus Crusade for Christ)","religious-and-spiritual","Power to Change is a Christian club who exists to serve the spiritual needs of students on campus.   Anyone and everyone is welcome to our club--whether you are a Christian or not.   We would love to hear your life story.

The core of our ministry consists of engaging events, discussion groups, prayer meetings, bible studies, weekly meetings, conferences, and spring/summer mission’s trips."
),
("Pre-Optometry Club, UW (UWPREOPT)","academic","The UW Pre-Optometry Club is open to all undergraduate members of the University of Waterloo who are interested in exploring a career in Optometry. Whether you are already planning to become an Optometrist, want to explore the possibility of a career in Optometry, or simply want to find out what Optometry is all about, this club is for you! The purpose of our club is to provide students with an opportunity to learn more about the profession of Optometry and to assist students in their preparation for Optometry School. We aim to help students find valuable pre-professional experiences, to help students network with each other and with professionals in the community, and to provide a more enjoyable educational experience."
),
("Pre-Pharmacy, UW","academic","The UW Pre-Pharmacy Club was created for students by students to act as a resource for those who have a passion for the pharmacy profession. Throughout the years the UW Pre-Pharmacy Club has become much more than just a resource to students. We are a dynamic club that creates an environment where it’s possible to interact and meet students with the same career goals as you. Even if you are merely considering pharmacy as a possible career we provide fun and interactive events that allow you to imagine what being a pharmacist is like. Our annual Pharmacy Olympics in the winter term, for example, make you scramble to count candy as fast as you can, basically stimulating a busy pharmacy after a holiday. We also provide talks with guest speakers (pharmacy students and pharmacists), information sessions, tours and much more!"
),
("QTPOC KW","charitable-community-service-international-development,creative-arts-dance-and-music,cultural,games-recreational-and-social,political-and-social-awareness","QTPOC KW is a student-run club that provides the space for individuals at the intersection of 2SLGBTQ+ and racialized (Black, Indigenous, POC) identities to play freely and build community. We focus on hosting community socials, panels, and other events that uplift our intersectional identities. 
"
),
("Rubik''s Cube Club (formerly twisty puzzles), UW","games-recreational-and-social","This club''s goal is to promote the awesomeness and furthered learning of all things associated with, and including, the Rubik''s Cube (including the Rubik''s Snake, Rubik''s Magic, Rubik''s 360, Rubik''s Clock and the Megaminx, just to name a few)."
),
("Serbian Student Association","cultural","The Serbian Student Association (SSA) allows Serbian students as well as other undergraduate students to come together and be open to the idea of networking, running potential fundraisers, and holding social gatherings where our culture can be shared and shown amongst other students. We look forward to inspiring and giving insight to students about our culture and traditions, and welcoming anyone to participate and become a member of the SSA. Any questions or concerns can be expressed on our Facebook page (University of Waterloo Serbian Student Association). 
"
),
("Sikh Students Association (SSA)","cultural","The University of Waterloo Sikh Students Association (SSA) attempts to provide an environment on campus, and beyond, that helps to promote the Sikh religion by practicing its beliefs and traditions. The above is achieved through various discussion groups, weekly path sessions, kirtans, guest speakers, Q/A periods and a variety of religious/language classes provided by fellow students. As well, UW SSA attempts to participate in a wide range of multi-cultural activities both on campus, and within the Sikh community (such as trips to the Gurdwara, Vaisakhi, etc).

In addition, our club organizes a number of intramural co-ed sports teams (Basketball and Volleyball, usually) and social functions (pool tournaments, bowling, etc.) and outings (dinners, horseback riding, skiing trips) that form the bulk of our time commitments.

We hope to create a ''family'' atmosphere by developing an hierarchy-less club that is devoted to providing an avenue for interaction amongst Sikh students at our University. UW SSA also provides educational help (study groups, old texts, exams, etc.) and holds one of the most successful on-campus events, ''Dastaar day'', previously known as ''Turban Day'' once a semester. This is an awareness day to teach the University community about the significance of the turban in Sikhism. We desire to produce conditions conducive to the further study, research and practice of Sikhism by our fellow Sikh students and all others interested in any aspect of the Sikh religion."
),
("Smash, UW","games-recreational-and-social","We play super smash brother melee for the Nintendo GameCube."
),
("SOCH Mental Health UW","charitable-community-service-international-development,cultural,health-promotion,political-and-social-awareness","SOCH Mental Health UW is a chapter of the SOCH Mental Health organization. In Hindi, Punjabi, and Urdu, the word SOCH means ""to think"" or ""a thought"". The founders of the SOCH Mental Health Organization brought this word to represent their mission as they believe to combat the stigma around mental health, we must change the way our community ""thinks"" about mental health. The mission of UW SOCH is to empower the community members of our university environment to recognize and accept mental health as an essential part of their well through education, prevention, and building resilience. SOCH will work to bring an open space for mental health conversations in both virtual and in-person settings. With the emphasis on mental health stigma in the South Asian community, SOCH looks forward to supporting the need for culturally and linguistically appropriate mental health conversations across the university campus. SOCH provides workshops rooted in mental health promotion. "
),
("Somali Student Association","cultural","The purpose of this club is to gather University of Waterloo Somali and non-Somali students in order to connect, share information and socialize in a relaxed and inclusive atmosphere. The club will educate both members and non-members about Somali culture, raise funds for various causes regarding the community on a local and global scale. The club is open to undergraduates and graduates that are either Somali or non-Somali from the University of Waterloo. "
),
("Students For Life, UW (UWSFL)","games-recreational-and-social","UW Students for Life (UWSFL) is a Pro-life club whose aim is to support women in crisis pregnancies through volunteer work and tangible resources, advocate for the rights of all human beings from fertilization to natural death, form club members to speak about these topics with confidence, and educate the student population about life issues. If you are interested in getting involved, please send us an email at uwstudentsforlife@gmail.com."
),
("Students Helping Seniors","charitable-community-service-international-development","Students Helping Seniors is a club that seeks to support local seniors by conducting fundraising events and providing volunteer service to local nursing homes and retirement residences. Our club will be working with various nursing homes in the Kitchener-Waterloo region. Some club activities include doing deliveries, writing birthday/holiday cards, making PPE (personal protective equipment) and distributing it, paying in-person visits, and hosting recreational events for the residents and staff."
),
("Tea and Culture Club","games-recreational-and-social","Just a place to drink tea, play games and have fun! Usually we meet every week for 2-3 hours. Come on out and drink as much tea as you could possibly want. 

Fees are $2/session or $10/term. 

Our Facebook group: https://www.facebook.com/groups/59392118134/
Our Discord channel: https://discord.gg/h3kdHw2"
),
("Tech+ UW","academic,business-and-entrepreneurial,charitable-community-service-international-development,cultural,media-publications-and-web-development","Tech+ UW''s mission is to cultivate a more inclusive and diverse tech community at UWaterloo by making resources more accessible to the community and students in need. We connect UWaterloo students with experienced and passionate individuals from different domains in tech, and foster this community through events that bring everyone together. "
),
("The AcaBellas - A Cappella Affiliate","creative-arts-dance-and-music","The AcaBellas are an all-female auditioned group under the UW A Cappella Club (UWACC). "
),
("The Citizens Foundation – University of Waterloo (TCF)","charitable-community-service-international-development","The Citizens Foundation (TCF) - UWaterloo chapter aims to raise funds in order to support education related projects and emergency crises situations in Pakistan, creating a platform and community for UWaterloo students that are concerned with the state of education in Pakistan."
),
("The Islamic Information Center of the University Waterloo (IICUW)","religious-and-spiritual","The Islamic Information Center of the University Waterloo (IICUW), is a registered Federation of Students club that promotes the intercultural diversity amongst society in Canada by enhancing interfaith tolerance and relationship through the improved perception of Islam. The IICUW strives to provide the local community with accurate and unbiased information regarding the principles of Islam. In order to achieve this noble aim, the IICUW facilitates the awareness of Islam by providing the following services:
Free copy of the Holy Quran (English Translation) Free Islamic Information Booths (in SLC) Free Books/DVDs on Islam Free Discover Islam Workshops Free Movie Nights (Documentaries/Lectures) Free Visit to Local Mosque Any information you need about Islam. "
),
("The Listening Party","charitable-community-service-international-development,creative-arts-dance-and-music,cultural,health-promotion","The Listening Party (TLP) is a student-run nonprofit organization that reflects upon public health issues present in modern Hip-Hop culture. Our mission is to promote mental health, anti-violence, and substance abuse awareness. This organization aims to create unity among students by using specific artists’ music as an outlet to discuss local public health issues. These conversations happen during our events, where we offer a blend of an enjoyable music listening experience, interactive games, a performance from a local artist, and serious dialogue that fosters a deeper understanding of public health issues in the realm of hip-hop and the local community. There’s beauty in your favourite rapper’s struggle."
),
("The Unaccompanied Minors - A Cappella Affiliate","creative-arts-dance-and-music","The Unaccompanied Minors are the University of Waterloo’s premier mixed, auditioned a cappella ensemble. The Minors consist of 16 to 26 musically talented students who have been singing, beatboxing, and rocking out to everything from top 40 hits to rock classics since 2009. Focusing on blend, musicality, and performance, the Minors have been spreading the aca-love wherever they go. From the Kitchener-Waterloo Area at campus events like TEDxUW, to the United States to compete at the International Championship of Collegiate A Cappella, the Minors have blown away audiences with their outstanding arrangements and enthusiasm. Interested in the group? Feel free to contact us!
"
),
("The Water Boys - A Cappella Affiliate","creative-arts-dance-and-music","The Water Boys are a mid-sized all-male auditioned group under the UW A Cappella Club (UWACC). 

E-mail: waterboys.acappella@gmail.com
Facebook: https://www.facebook.com/waterboysuw
YouTube: http://www.youtube.com/waterboysacappella"
),
("The Women''s Network (TWN)","academic,business-and-entrepreneurial,games-recreational-and-social","The Women’s Network (TWN) was created for ambitious women looking to grow professionally while being lifted by their community. TWN offers opportunities to gain exposure to the professional world, network with high-profile speakers and meet peers around their campus and the country. TWN holds speaker meetings, various networking events, resumes, internship and LinkedIn workshops, alumni networking receptions and interactive activity sessions to develop relationships with fellow members. Our workshops and guest speakers help prepare you for your next steps and may open your eyes to paths you haven''t even considered."
),
("TMA (Thaqalayn Muslim Association)","religious-and-spiritual","The Thaqalayn Muslim Association was founded in early 2012. The club was formed by a group Shia Ithna Asheri Muslim students in response to a lack of an official support network for the post-secondary Shia Muslim students in the Kitchener-Waterloo region. Although the headquarters of TMA Waterloo''s activities is the University of Waterloo''s main campus, the TMA aims to be accessible to all post-secondary students in the region. Thus, the TMA Waterloo’s purpose is to cater primarily, although not exclusively, to the needs of the Shia Ithna Asheri Muslim post-secondary students at the University of Waterloo, and the surrounding region, while simultaneously representing their collective voices and pursuing their ideals.
"
),
("Traditional Chinese Ink Wash Painting Club","creative-arts-dance-and-music,cultural","We provide place, some materials and guidances for students to mindfully practice Chinese painting and Chinese calligraphy in a group. We offer activities including Chinese painting and calligraphy workshops, painting practice sessions, nature walk and paint in the nature. Anyone interested in painting or Chinese culture are welcomed to join!"
),
("Turathna (Palestinian Students Association)","cultural","The Palestinian Student Association is meant to bring Palestinians and non-Palestinians together to appreciate our culture and keep our traditions alive. We want to ensure all Palestinians have a place that feels like home by doing what Palestinians do best, sharing our food, music, traditional clothes, and customs with the world and with each other!"
),
("United for Literacy – University of Waterloo","academic,charitable-community-service-international-development","United for Literacy - University of Waterloo is considered the “Kitchener/Waterloo Chapter” of United for Literacy (formerly known as Frontier College), a national, non-profit organization that aims to improve literacy across Canada. We work to promote literacy awareness in the Kitchener/Waterloo community and help students get involved in United for Literacy programs as volunteers."
),
("Universal Finance Organization, UW","academic,business-and-entrepreneurial","With the use of game nights, guest speakers, information sessions and newsletters, UFO aims to introduce new students to personal finance. Through various workshops, events, and competitions between members. UFO supports the career development of all students. We wish to contribute towards building a financially literate world.
"
),
("University of Waterloo Bhangra","creative-arts-dance-and-music,cultural,games-recreational-and-social,health-promotion","UWaterloo Bhangra is a club that aims to spread the love of the Bhangra dance form throughout the university in various different ways such as flash-mobs, regular recreational dance sessions, workshops and etc.
UWaterloo Bhangra shall also aim to give students at Waterloo a chance to dance Bhangra at a competitive level, while representing the university amongst various other varsity-level Bhangra teams."
),
("University of Waterloo Canadian Association on Gerontology Student Connection (UWCAG)","academic,charitable-community-service-international-development,health-promotion","The University of Waterloo Canadian Association on Gerontology Student Connection (UW CAG) is a club whose purpose is to promote interest in aging research. Our goal is to provide opportunities for undergraduate students to explore current aging research, learn more about careers in the field of gerontology, and engage in professional development."
),
("University of Waterloo Cantonese Chinese Christian Fellowship","cultural,games-recreational-and-social,religious-and-spiritual","UW Cantonese Chinese Christian Fellowship (UWcCCF) is a Christian group on campus with a focus in Cantonese and English speaking students. We aim to build a community of Christian believers on campus, equip members with biblical knowledge, and evangelize others at the University of Waterloo. UWcCCF consists of mostly Christians rooted in Cantonese culture or from a Hong Kong background, however, anyone is welcome to learn more about God, connect with brothers and sisters, and share their love to people around them. We run various interactive activities during our weekly meetings, such as Bible studies, worship, prayer nights, games and outreach services. Please browse our Facebook page to know more about us! We look forward to seeing you!

Facebook group: https://www.facebook.com/groups/uwcccf/ (General information)
Email: uwcccf@clubs.feds.ca"
),
("University of Waterloo Chinese Classical Dance Club","creative-arts-dance-and-music,cultural","The UW Chinese Classical Dance Club (UWCCDC) focuses on practicing and performing traditional chinese dances. Members attend weekly sessions where they will learn how to practice chinese dance techniques such as stretches, kicks, and leaps. Part of each session will be dedicated to learning a traditional chinese dance so that members can appreciate the grace, elegance, and precision of the dance style. Sometimes members will also have the option to participate in a group dance performance with full costumes, props, and makeup. Our club welcomes all experience levels! If you have any questions please don''t hesitate to contact us at uwccdc@gmail.com."
),
("University of Waterloo Energy Network","academic,environmental-and-sustainability","The University of Waterloo Energy Network is a group of students bound together by a shared belief in a sustainable approach to the Energy Industry. UWEN offers the chance for like-minded students to attend educational seminars, panel discussions, participate in exciting competitions and informal opportunities to network with industry professionals."
),
("University of Waterloo Korean Students’ Association","academic,cultural,games-recreational-and-social,media-publications-and-web-development","University of Waterloo Korean Students’ Association (UWKSA) is a cultural organization that aims to connect the Korean community through our social and academic events. We also promote Korean culture to help create a more inclusive environment."
),
("University of Waterloo Legend of Three Kingdoms Club","games-recreational-and-social","UW Legend of the Three Kingdoms Club is a club that holds weekly events to play the board game called the Legend of the Three Kindoms. This is a Chinese boardgame about a famous age of the Chinese history, that people can play different roles with their winning requirements and different character to use their unique effects. We have both Chinese and English version of the boardgame and we welcome all new players to join us!!!"
),
("University of Waterloo Moot Court","academic","The University of Waterloo Moot Court is a club for students interested in building their verbal advocacy skills, knowledge of critical legal issues, and presentation abilities in the courtroom. Members will have access to information sessions on the mooting process, networking opportunities with real legal professionals, and resources that will encourage them to succeed in moot competitions in their undergraduate career and beyond."
),
("University of Waterloo Raising the Roof","charitable-community-service-international-development,games-recreational-and-social,political-and-social-awareness","University of Waterloo’s Raising the Roof club is partnered with the Raising the Roof non-profit organization, whose mission is to provide national leadership on solutions to homelessness. Our objective is to work towards making their vision a reality through fundraising for them. Many exciting events will be planned to do so, and educational events will also take place to enlighten members and students within our community on this national conflict.  

 "
),
("University of Waterloo Soka Gakkai International (UWSGI)","religious-and-spiritual","The purpose of the club is to gather University of Waterloo students, staff, faculty, and members of the UWaterloo community at large to better understand Nichiren Daishonin’s Buddhism with the keen understanding that we live in a diverse environment. The Soka Gakkai is a diverse global community of individuals in 192 countries and territories who practice Nichiren Buddhism. It cherishes the value of peace, culture and education centered on the respect for the dignity of life. We meet weekly to discuss different topics related to student life and being global citizens through the lens of humanistic Buddhism. We also work on projects related to Nichiren Buddhism education and connect with the larger Waterloo community. "
),
("University of Waterloo Sports Business Association (UWSBA)","business-and-entrepreneurial,games-recreational-and-social","Founded in 2013, the University of Waterloo Sports Business Association (UWSBA) is an official student-run club at the University of Waterloo, bringing together a community of students who aspire to have a career in the sports industry. We look to combine sports, business and innovation to provide opportunities to students!"
),
("University of Waterloo Ukrainian Association (UWUA)","cultural,political-and-social-awareness","University of Waterloo Ukrainian Association promotes and raises awareness about Ukrainian culture, unites those interested in Ukraine, advocates and supports Ukraine and Ukrainian students at the University of Waterloo. "
),
("University of Waterloo Zoology Club","environmental-and-sustainability","The zoology club is a community of animal-loving UW students. Through online engagement, educational campaigns, and group events, we are building a community of students that are passionate about everything animal related. We are eager to discuss and educate our UW peers on animal-related topics such as animal endangerment, local animals within our community, obscure animals you might not know about, and plenty more!"
),
("UW ACE Chapter","academic,business-and-entrepreneurial","DECA is an international student organization that joins college and university students together to engage in business related activities.

These include seminars and conferences, professional development, competition, community service, and public speaking.

DECA programs and activities are focused on helping members grow and develop as professional business leaders. DECA focuses on networking with other students as well as professionals, improving communication and leadership skills while Increasing your knowledge in the areas of marketing, finance, entrepreneurship and management through case studies, tests and role plays."
),
("UW against Child Abuse","charitable-community-service-international-development,political-and-social-awareness","UW against Child Abuse is a club that aims to raise awareness and funds for the Child Rescue Coalition and other organizations with similar interests. This organization works to protect and rescue children from sexual abuse and child sexual abuse material.  "
),
("UW ALPHA Education","academic,cultural,political-and-social-awareness","The Association for Learning and Preserving the History of WW2 in Asia (ALPHA) is an organization that strives to foster the learning and critical understanding of the history behind WWII in Asia through education. With a successful chapter at UofT, ALPHA education is now bringing the same learning resources and outreach to The University of Waterloo.
"
),
("UWaterloo Chai and Verse","creative-arts-dance-and-music,cultural","UWaterloo Chai and Verse strives to curate an inviting and intimate space for exploring and discussing poetry, folk tales, and other forms of literature and art from South Asian, Afghan, and Persian languages and regions.

Everyone is welcome. Make sure to follow our Instagram or to email us with any concerns. We hope to be honoured by your presence. "
),
("UW Bioethics Society","academic,health-promotion,political-and-social-awareness","UW Bioethics Society is a club that discusses topics in bioethics, promotes the development of ethical thinking and research skills, with a focus on evidence-based concepts. "
),
("UW Blockchain Club","academic,business-and-entrepreneurial,media-publications-and-web-development,political-and-social-awareness","The UW Blockchain club is a network of students interested in Blockchain technology.

After Bitcoin was released, people soon realized the immutable structure of Blockchains can be extended to be much more than just a store of value. At UW Blockchain Club, we discuss that underlying technology and it''s implications."
),
("UW Blue Ribbon Club(BRC)","charitable-community-service-international-development,health-promotion,political-and-social-awareness","The Blue Ribbon Club is a collaborative effort that strives to bring Autism Awareness to the forefront of UW’s Campus and the Waterloo region."
),
("UW Board Games Club","games-recreational-and-social","Welcome to the UW Board Games Club! We''re a club that provides a relaxing, awesome, and friendly environment to learn and play a variety of board/table top games. From Monopoly, to Scrabble, and even Catan, we encourage you to join and have a great time with us!"
),
("UWBobaTime","games-recreational-and-social","
The UW BoBaTime club aims to create an inclusive and safe space for all bubble tea drinkers! Join us to meet fellow bubble tea enthusiasts, and spend time relaxing while having a cup of boba on the side. "
),
("UW Canadian Association for Global Health (UW CAGH)","academic,charitable-community-service-international-development,environmental-and-sustainability,health-promotion,political-and-social-awareness","We are the University of Waterloo Student Chapter of the Canadian Association for Global Health (UW CAGH). We represent a student-led initiative designed to foster research and networking in global health among University of Waterloo students across all disciplines. Our goal is to engage with students interested in global health research or who may be considering a career in the field of global health, to open opportunities for professional development. 

We invite students from all faculties at UW to follow us on instagram (@cagh_uw) and to join our general member email list: https://forms.gle/y6E7WYbu2QCX2Svr6

To learn more about the larger Canadian Association for Global Health, check out this link https://cagh-acsm.org/en ."
),
("UW Cancer Foundation","academic,charitable-community-service-international-development,health-promotion","UW Cancer Foundation is a student-run club that focuses on raising awareness within the student community on the topic of cancer and the various types of cancers that impact our society today. One of their goals is to create a variety of fundraising events that will aid in the fight against cancer. In addition, the club hopes to work alongside organizations such as the Canadian Cancer Society and the National Cancer Institute to support cancer researchers."
),
("UW Charity Knitting Circle","charitable-community-service-international-development,creative-arts-dance-and-music","The UW Charity Knitting Circle is a club where students can knit together in a relaxing, social environment. The club selects at least one knitting-related charity per term and creates handcrafted items to donate to them. Knitters at any level of experience, including those who have never knit before, are welcome to join and either learn a new craft or develop their existing skills."
),
("UW Chinese Instrumental Orchestra","creative-arts-dance-and-music,cultural","The UW Chinese Instrumental Orchestra Club welcomes everyone who’s passionate about traditional Chinese music and wish to play classical Chinese instruments as part of the orchestra. The goal of playing and promoting Chinese music is expected to be achieved through bi-weekly rehearsals, bi-weekly sectional tutoring, and performances. Players at all levels are welcomed to join! Contact us through our email: uwchineseorchestra@gmail.com"
),
("UW Cuban Salsa Club","creative-arts-dance-and-music","UW Cuban Salsa club works closely with Laurier Salsa club and dedicates to spread the joy that Casino Rueda (Cuban Salsa) brings to all of us! Check out our Youtube videos showcasing our performances and our Twitter feed for more information!"
),
("UW Dhamaka","creative-arts-dance-and-music,cultural","UW Dhamaka is a club to bring together the community of Indian dancers and fuse Bollywood music and dance culture into the UW student body. The club aims to infuse the different cultural dance forms in Bollywood such as bhangra, kathak, bolly-hop and more. "
),
("UW Drag Club","creative-arts-dance-and-music,games-recreational-and-social","The purpose of the club is to explore and celebrate drag culture and performance. Club events, activities, and/or initiatives will include learning and sharing performance techniques, discussing drag-related topics, and putting on drag performances."
),
("UW Entrepreneurship Society","business-and-entrepreneurial","EntSoc aims to build inclusive innovation at UW by exposing students of all faculty and experience levels to the entrepreneurial ecosystem. We do this by building bridges between campus organizations and clubs, connecting students to resources, running events, and working on internal projects that fill gaps within the entrepreneurial ecosystem at UW. Here are some of our campus partners: Conrad School of Entrepreneurship and Business, Concept, The Problem Lab, GreenHouse, Coffee n'' Code, UWVR, WiSTEM...and many more!
"
),
("UW Futures in Rehabilitation Sciences","academic","The UW Rehab Sci Club aims to help students learn about careers within the field of rehabilitation sciences, including but not limited to: physiotherapy, occupational therapy, and speech-language pathology. Join us and learn about the nature and scope of these professions through info sessions, social media takeovers, infographics, and more!"
),
("UW Go Club","games-recreational-and-social","The University of Waterloo Go Club is a community where students can come learn, play and study the game of Go. We host weekly meetings and provide an environment for both new and experienced players."
),
("UW Kpop Club","creative-arts-dance-and-music,cultural,games-recreational-and-social","UW Kpop Club was created to bring kpop fans together and share our common interest in Korean popular culture. It will be a safe place to discuss and share kpop related topics.  Members will be able to participate in events to express their interest in kpop and meet fellow kpop fans at the Unviersity of Waterloo."
),
("UW Lions Club","charitable-community-service-international-development","The UW Lions Club is a sub-chapter of KW Lions Club that aims to improve the lives of people in our community by collecting used eyeglass frames from students and faculty members at the University of Waterloo. The collected frames will be donated to people all over the world who may not be able to afford them. Additionally, we aim to host a variety of fundraising events to support the Guide Dog School, which raises guide dogs to be provided for the visually and physically handicapped as well as hearing impaired citizens."
),
("UW Operation Smile","charitable-community-service-international-development,health-promotion","UW Operation Smile is a club affiliated with Operation Smile Canada, an organization that aims to raise awareness and provide medical assistance and surgeries to countries around the world for cleft lip and cleft palate. UW Operation Smile works to raise awareness of these conditions in the Kitchener-Waterloo region, and hosts a variety of fundraising events to help raise donations toward this cause."
),
("UW Period Purse","academic,charitable-community-service-international-development,health-promotion,political-and-social-awareness","Menstruation is often stigmatized across diverse cultures and communities and is associated with negative connotations. The founder of the UW Period Purse strives to eradicate this stigma by addressing this topic that affects billions of women every day. UW Period Purse is an organization that is committed to uplifting and empowering marginalized women in period poverty, which is a crucial public health concern. Period poverty refers to the inability of women to access menstrual products due to financial constraints. It is estimated that Canadian women spend up to $6,000 in their lifetime on menstrual hygiene products. At UW Period Purse, we believe that menstrual products should not be a luxury but a necessity. Periods are often used interchangeably with menstruation. Hence, the founders of UW Period Purse brought in this word to represent our club, as it combats the stigma and negative connotations that are often associated with menstruation."
),
("UW Poker Studies Club","games-recreational-and-social","The UW Poker Studies Club (UWPSC) offers a fun social environment to play and learn about No Limit Texas Hold''em. Tournaments are held twice a week, providing an opportunity for new players to try out the game, as well as a competitive experience for those interested in sharpening their skills. Prizes are awarded to top performing players each event, and those who do consistently well throughout the term may receive an invite to the end-of-term tournament, where larger prizes are available.

For more information, head to uwpokerclub.com or check out our socials!
Discord: discord.gg/2k4h9sM
Facebook: facebook.com/uwpokerstudies
Instagram: @uwpokerclub
Email: uwaterloopoker@gmail.com

(Our tournaments have no mandatory buy-in or wagers. The club operates entirely on a non-gambling basis.)"
),
("UW Pre-Dental Club","academic","UW Pre-Dental club is a club ran for Pre-Dental students at the University of Waterloo whether they are undergraduates or graduate students. The objective is to provide students with the necessary information that Pre-Dental students need such as running DAT workshops, application workshops, and interview workshops. Pre-Dental students will also find themselves impacting the community as oral promotion events will be held."
),
("UW Pre-Med Club","academic,health-promotion","UW Pre-Med Club is an event-based club under the Federation of Students. We are a student-run organization that provides assistance and networking opportunities for those interested in medicine and medicine-related careers. The club holds various events that provide information on topics such as the medical school application process, the MCAT and its associated preparatory courses as well as ways to get involved around your school and community. The club is open to students of all faculties at the University of Waterloo."
),
("UW Public Speaking Club","academic","Who we are

Are you looking to develop speaking, presentation, and leadership skills? Ace a job interview? Ignite your career? Or want to have fun by sharing your thoughts?

UW Public Speaking Club is filled with inquisitive and enthusiastic members. We bond and learn together through weekly meetings (Thursdays 5:30 - 6:45 pm), competitions, workshops, and social events. Associated with Agora Speakers International, we engage participants through a series of prepared and impromptu speeches strongly supported by meeting roles.

How Does It Work?

Our meetings follow a structure of a learn-by-doing format, in which participants hone their speaking and leadership skills in a no-pressure atmosphere. There are no instructors or judges, instead, members evaluate one another’s presentations. This feedback process is a key part of the program’s success.

Meeting participants also give impromptu talks on assigned topics, conduct meetings, and develop skills related to timekeeping, grammar, speech analysis, and evaluation. Members go through a journey of personal and professional development by working through Pathways, an education program designed to develop competencies in
communication and leadership.

Guests and visitors are welcome to come to as many meetings as they want before deciding whether to join as formal club members.

Feel free to contact us via 
Email: uwpublicspeaking@gmail.com,
Facebook: https://www.facebook.com/groups/uwpublicspeaking or
Instagram: https://www.instagram.com/uwpublicspeaking/"
),
("UW Quizbowl","academic,games-recreational-and-social","UW Quizbowl is a club where all lovers of trivia meet! There are casual meetings where students can play against their fellow students as well as inter-university competitions. A wide range of topics are covered in the questions read, including academic subjects (such as science, history, music, etc.) and pop-culture. If you like trivia, feel free to drop by!

Check out our social media for more information! https://linktr.ee/uwquizbowl"
),
("UW Shuffle Dancing Club","creative-arts-dance-and-music","The UW Shuffle Dancing Club is meant for anyone interested in Shuffle Dancing (Shuffling), a popular dance style which originated in raves. Shuffling involves mesmerizing footwork, and is a great way to stay active. We hold practice sessions twice a week for those looking for a fun hobby to pursue.

Membership is open to students with all levels of dancing experience - from novice to advanced. No audition is needed to be a part of this club, provided you can commit to attending the weekly practice sessions.

Discord: https://discord.gg/sSg3fghaBM"
),
("UW Society of Addictions Awareness (UW SAA)","health-promotion","UW Society of Addictions Awareness (UW SAA) is a club that aims to promote awareness in the field of addictions and substance use disorders. Our goal is to prepare future health professionals to effectively deal with the complex health challenges and social issues surrounding addictions. This is accomplished by educating undergraduate students about addictions, providing exposure to potential career paths, and inviting guest speakers who are experts in the field of addictions. Follow us on Instagram (@uw_saa) to join us and learn more!
"
),
("UW Street Dance","creative-arts-dance-and-music","We are a community of dancers who are passionate about the heart of dance and hip hop culture. Whether you are interested in fundamentals, popping, hip-hop, locking or breaking, come jam with us and enhance your skills and diversity. We focus a lot on freestyle dance and play a variety of beats during our sessions, allowing anyone to express themselves freely, while still be able ask questions or gain greater insight on a certain groove or dance move. Our sessions will mainly focus on popping which is the technique of quickly contracting and relaxing muscles to create an intricate body movement. Popping also involves influences of hip hop, which will be practiced with grooves and rhythm. You do not need a background in dance to come, we are happy to session with you and teach you the skills that we have learned. Our club will differ from other HIP HOP clubs on campus through mainly focusing on freestyle dance sessions and not as heavily choreography based. If you want to expand your dance knowledge and be more free, come dance with us."
),
("UW Supporting Heart and Stroke","health-promotion","UW Supporting Heart and Stroke is a group of students whose goal is to raise awareness about heart disease, stroke, and related conditions. Heart-related diseases are a burden to many adults, and it often stems from a poor lifestyle at a young age. Our group strives towards creating a healthier community by educating UWaterloo members and raising money in support of the Heart and Stroke Foundation. "
),
("UW Supporting SickKids","charitable-community-service-international-development,health-promotion","UW Supporting SickKids is dedicated to creating a practical impact within the Waterloo community and beyond all in hopes to aid the Hospital for Sick Children (SickKids) through a variety of different means. These means will go beyond financial support as the club will also contribute by sending gifts and letters to bring smiles on children''s faces and supporting staff, parents, and patients along their journeys. The club will aim to work with members of all faculties to seek support and spread awareness. If you''re interested and looking to get involved with local volunteering and fundraising, contact us today and join our team!
"
),
("UW Tetris Club","games-recreational-and-social","The goal of UW Tetris Club is to bring students together by enjoying the classic game of Tetris. Tetris is a fun, simple to learn game that can help students meet new friends and de-stress. 

Casual and/or competitive matches will be held weekly via Discord for students to bond over the exciting game of Tetris."
),
("UWTSS - UW Taiwanese Student Society","cultural,games-recreational-and-social","UWTSS’ goal is to connect and share to everyone who is interested in learning more about our culture. Explore various topics such as Taiwanese food, pop culture, street market, and bubble tea! "
),
("UWVSA (University of Waterloo Vietnamese Student Association)","charitable-community-service-international-development,cultural","To the University of Waterloo, we are your connection to Vietnamese culture, Vietnamese traditions, and the Vietnamese community. UW VSA strengthens the campus community through organizing social events, cultural events, and collaborations."
),
("UW World Vision","charitable-community-service-international-development","UW World Vision is the official university chapter of World Vision Canada, committed to advocating on behalf of the most vulnerable in the world. We raise awareness for the most pressing global issues and fundraise for relief and development projects aimed to create lasting change in the lives of children, families, and communities to overcome poverty and injustice. We invite students of all interests, backgrounds, and skills to take part in the global fight for human rights and equality."
),
("Visual Arts Club, UW","creative-arts-dance-and-music,games-recreational-and-social","Visual Arts Club welcomes all artists, designers, hobbyists, and those curious about art! We hold drawing sessions, explore different mediums and techniques, and hold themed events. All skill levels welcome! Meetings occur weekly. "
),
("WaterBoo!","games-recreational-and-social","Horror Club is a place where students can come together to enjoy the horror genre. Students can enjoy discussing the genre, experiencing it, and even developing their own horror-themed creations. Activities include watching horror movies, playing horror video games, reading horror stories, and anything else horror!"
),
("Waterloo Arab Student Association","cultural,games-recreational-and-social,political-and-social-awareness","The purpose of the club is to promote Arab heritage through cultural, social, and educational events. We aim to build a community that connects students of Arab origin and/or interested in Arab culture to foster mutual support. WASA intends to strengthen the Arab community in UWaterloo and address Arab affairs."
),
("Waterloo Hockey Club","cultural,games-recreational-and-social,media-publications-and-web-development","We are a group of hockey fans who enjoy getting together to take part in hockey related activities. Our club activities include getting together to watch livestreamed games on campus, going to see in-person hockey games, and playing fantasy hockey online throughout the semester. We welcome everyone from lifelong fans to those who are new and interested in getting involved in the sport. This club offers both a great way to socialize with new people and follow Canada''s most popular sport."
),
("Waterloo Ismaili Students'' Association","cultural","The Waterloo Ismaili Students Association (WISA) is a not-for-profit organization that primarily provides a venue for Ismaili Muslim students attending UW to congregate for daily prayers. The club emphasizes a strong sense of community and also holds educational, social, and sports events for our members, in which the greater community is often encouraged to participate."
),
("Waterloo Movie Watchers Club","creative-arts-dance-and-music,cultural","The Waterloo Movie Watchers club provides a medium where members watch and share appreciation for various types movies. We meet up once a week to watch a movie, critically analyze it and discuss it within the group. We recognize the importance of movies as a factor influencing culture and civilization as a whole. We meet every week to watch a movie as an entertainment, as well as a social gathering."
),
("Waterloo Oncology Pharmacy Interest Group","academic","An organization of motivated pharmacy students at the University of Waterloo School of Pharmacy with a keen interest in oncology."
),
("Waterloo Punjabi Association (WPA)","charitable-community-service-international-development,cultural","WPA is a club that is designed to bring cultural diversity to the Waterloo community by being an organization that strives to express the Punjabi culture through various activities that are based on cultural events, holidays and traditions. 
"
),
("Waterloo Science Fiction & Fantasy Club (WATSFIC)","games-recreational-and-social","WatSFiC is the University of Waterloo’s Science Fiction and Fantasy club. With roots in promoting interest in science fiction writing, the club has expanded to include all things science fiction, fantasy, and TTRPG. The club hosts many games of D&D 5e, Pathfinder, and Call of Cthulhu for all levels of players from beginner to master along with lesser known TTRPG systems. There are always books and movies to talk about or something to play!"
),
("Waterloo Snow Coalition","cultural,games-recreational-and-social","The Waterloo Snow Coalition (WSC) enjoys and promotes every
benefit of the university club experience! We host ski/snowboard trips and various other on and off campus events.  We are a great club for
1st-years, grads, and exchange-students alike. We have a huge list of members and we expect even more to join our club throughout the winter each and every year during our amazing ski trips."
),
("Waterloo Zine Club","creative-arts-dance-and-music,cultural,media-publications-and-web-development","Waterloo Zine Club (aka WAT Is Zine?) is a club dedicated to showcasing the creativity of the UW student body. We put out monthly issues that feature artwork, poetry, articles and more from UW students exclusively! If you have something you want to share with our community or want to help put our zine together join our team! We''re always looking for submissions and people to help out. "
),
("White Coat","academic,health-promotion","WhiteCoat consists of a group of pharmacy students passionate and dedicated on educating the public and other students on different health topics. We achieve this through health presentations and online posts providing health tips in order to engage with others!"
),
("Women in Healthcare","academic,health-promotion,political-and-social-awareness","Women in Healthcare was founded in Spring 2020 with the goal of advancing women in different healthcare fields and advocating for gender equality. We welcome anyone interested in the medical fields including but not limited to medicine, pharmacy, optometry, and dentistry. Our club events, workshops, and mentoring programs will be focused on celebrating achievements of women in healthcare, stimulating dialogue on gender biases in our career path, and empowering female professionals to be leaders in the healthcare field. We hope to become the unique voice for women’s well-being and the advancement of women in healthcare by offering a selection of activities and initiatives open to students of all genders and backgrounds. In solidarity and strength, we will work towards discovering our full potentials as future female healthcare professionals."
),
("Women in Pre-Law","academic,political-and-social-awareness","WomeninPreLawUW strives to create a space for women across all programs at the University of Waterloo to learn and support one another through their own unique journey of pre-law. Our vision is to bring together women from various majors and faculties who share this passion for law, whether they plan on going to law school, or simply find law interesting and want to become more immersed in learning and reflecting on women in this field. We commit to education on our platforms by reflecting on important inspirational figures and women empowerment. The club at its core allows an opportunity for women on campus to find like-minded individuals who share their passion for law, with a focus on women''s empowerment and education overall!
"
),
("Women in Science, Technology, Engineering, and Mathematics (WiSTEM)","academic,games-recreational-and-social,political-and-social-awareness","WiSTEM (Women in Science, Technology, Engineering, and Math) was founded in Spring 2013 by UW students who want to promote equality in STEM disciplines. Although we focus on the issue of gender imbalance, we encourage both males and females, grads and undergrads, and anyone with a connection to STEM to participate. Our activities are a mix of skills workshops, topical discussions, homework help, speakers, and special trips. We hope to deliver a regular programme of events spanning all STEM topics which promote collaboration, creativity, and open-mindedness to all students.
"
),
("Young Liberals, UW","political-and-social-awareness","The Young Liberals of Canada is the organization for progressive, politically-minded youth. The University of Waterloo Young Liberals, exists to help students, faculty and citizens get informed and engaged in Canadian politics. Our mission is to inform and inspire the next generation of political leaders in the Kitchener-Waterloo region and across Canada, and connect Canadian youth with the political process. 

We strive to provide an inclusive environment where political opinions and ideas can be shared freely, and group members are given opportunities for active participation, personal growth, and leadership. We are affiliated with the Liberal Party of Canada, and believe in the liberal ideals of freedom, justice and equal opportunity for all Canadians."
),
("Yugioh Club","games-recreational-and-social","Yugioh club is here for you to play, learn about Yugioh in both casual and competitive environments, though teaching, trading cards and having duels.

We have weekly meetups to play Yugioh and trade, as well as support for newer players to play, including test decks and coaching.

We encourage our members to attend local tournaments as well as larger Konami-sanctioned events such as regional and YCS''.

Discord: https://discord.gg/cEt7fqS")
