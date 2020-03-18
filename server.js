const koa = require("koa");
const koaRouter = require("koa-router");
const app = new koa();
const router = new koaRouter();
app.use(router.routes());

router.get("/", (ctx, next) => {
  const Spruce = require("./Spruce");
  const info = {
    user: {
      name: "Jin Jie/Jack Xu",
      summary:
        "BSSE graduate with 4 years experience in programming across various platforms",
      profession: "Software Engineer",
      address: "1010 California Ave",
      city: "Klamath Falls",
      state: "OR",
      zipcode: "97601",
      phone: "541-539-1133",
      email: "jackjinj.xu@hotmail.com",
      linkedin: "www.linkedin.com/in/jackjinjie-xu/"
    },
    experiences: [
      {
        place: "OREGON INSTITUTE OF TECHNOLOGY, KLAMATH FALLS, OR",
        fromyear: "2018",
        frommonth: "Sep",
        toyear: "2019",
        tomonth: "Jun",
        title: "Senior Project",
        responsibilities:
          "Three-term individual project for a restaurant, an order taking system that could take, view, cancel, and close orders, has three clients, order client, kitchen client, front-desk client, a database server, and a REST API server, developed with Node.js, Express.js, PostgreSql, React Native, and Electron.js"
      },
      {
        place: "OREGON INSTITUTE OF TECHNOLOGY, KLAMATH FALLS, OR",
        fromyear: "2017",
        frommonth: "Sep",
        toyear: "2018",
        tomonth: "June",
        title: "Junior Project",
        responsibilities:
          "A three-term team-based project, a cross-platform application using Xamarin Forms that finds and evaluates equations for students, designed and developed the GUI of the application using xaml and C#"
      },
      {
        place: "KING WAH RESTAURANT, KLAMATH FALLS, OR",
        fromyear: "2015",
        frommonth: "Sep",
        toyear: "2017",
        tomonth: "Sep",
        title: "Hosting",
        responsibilities:
          "Working as a host, serving customers, working in groups, cooperating and interacting with other workers"
      }
    ],
    educations: [
      {
        name:
          "Bachelor of Science, Major in Software Engineering, Minor in Applied Mathematics",
        place: "OREGON INSTITUTE OF TECHNOLOGY, KLAMATH FALLS, OR",
        from: "2015",
        to: "2019",
        gpa: "GPA: 3.66/4.0",
        minors: ["Applied Mathematics"],
        courses: [
          "CST211 Data Structures",
          "CST236 Engineering for Quality Software",
          "CST276 Software Design Patterns",
          "CST324 Database Systems and Design",
          "CST356 Web Development"
        ]
      }
    ],
    hardskills: [
      {
        name: "Coding",
        level: 5,
        proficiency: "Expert"
      },
      {
        name: "Debugging",
        level: 4,
        proficiency: "Advanced"
      },
      {
        name: "Unix Env.",
        level: 5,
        proficiency: "Expert"
      }
    ],
    hardskills_bulletlist: [
      "OOP",
      "Debugging",
      "Unix Env.",
      "SQL",
      "RESTful API",
      "Mobile Dev",
      "Web Dev",
      "SDLC",
      "Git",
      "VS Code"
    ],
    softskills: [
      {
        name: "Collaboration",
        level: 4,
        proficiency: "Advanced"
      },
      {
        name: "Critical Thinking",
        level: 4,
        proficiency: "Advanced"
      }
    ],
    softskills_bulletlist: [
      "Collaboration",
      "Critical Thinking",
      "Problem Solving",
      "Positive Attitude",
      "Multi-languages"
    ],
    languages: [
      {
        name: "C/C++",
        level: 5,
        proficiency: "Expert"
      },
      {
        name: "C#",
        level: 4,
        proficiency: "Advanced"
      },
      {
        name: "HTML/React",
        level: 3,
        proficiency: "Intermediate"
      },
      {
        name: "NodeJs",
        level: 3,
        proficiency: "Intermediate"
      }
    ],
    languages_bulletlist: [
      "C/C++",
      "C#",
      "JS",
      "React/React Native",
      "SQL",
      "HTML"
    ]
  };
  Spruce(info, pdf => {
    ctx.type = "application/pdf";
    ctx.body = pdf;
    delete require.cache[require.resolve("./Spruce.js")];
  });
});

app.listen(3000);
