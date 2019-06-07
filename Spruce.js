const createPDF = function(info, cb) {
  const pdfkit = require("pdfkit");
  const strokeColor = "#D1D1D1";
  const topRectColor = "#373D48";
  const rightRectColor = "#F1F1F1";
  const pdf = new pdfkit({
    size: "Letter",
    layout: "portrait"
  });

  const PageSize = {
    width: pdf.page.width,
    height: pdf.page.height
  };
  const leftMargin = 26;
  const rightMargin = 180;
  const leftMargin2 = PageSize.width - rightMargin;
  const textWidth = PageSize.width - (leftMargin + rightMargin + 130);
  const links = [
    ["LinkedIn", info.user.linkedin],
    ["Twitter", info.user.twitter],
    ["Personal", info.user.personal]
  ];
  let buffers = [];
  let leftStartY = 160;
  let rightStartY = 324;
  const maxSkillWidth = 55;
  pdf.on("data", buffers.push.bind(buffers));

  // Create Top section for personal infortmation
  pdf.rect(0, 0, PageSize.width, 93).fill(topRectColor);
  createTextAt(pdf, info.user.name, leftMargin, 26, {
    size: 25,
    family: "Helvetica"
  });
  createTextAt(pdf, info.user.profession, leftMargin, 56, {
    size: 15,
    family: "Helvetica"
  });

  // Create Summary
  createTextAt(pdf, info.user.summary, leftMargin, 108, {
    size: 9,
    family: "Helvetica",
    fill: "#000000",
    width: textWidth + 100
  });

  //Create Education
  createTextAt(pdf, "Education", leftMargin, 132, {
    size: 15,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  pdf
    .moveTo(leftMargin, 150)
    .lineTo(PageSize.width - leftMargin - rightMargin, 150)
    .strokeColor(strokeColor)
    .stroke();
  for (let i = 0, g = 0; i < info.educations.length; ++i, g += 10) {
    createTextAt(
      pdf,
      info.educations[i].from + " - " + info.educations[i].to,
      leftMargin,
      leftStartY + g,
      { size: 9, family: "Helvetica-Bold", fill: "#000000" }
    );
    createTextAt(pdf, info.educations[i].name, 130, leftStartY - 2 + g, {
      size: 12,
      family: "Helvetica-Bold",
      fill: "#000000"
    });
    createTextAt(pdf, info.educations[i].place, 130, leftStartY + 17 + g, {
      size: 9,
      family: "Times-Roman",
      fill: "#000000"
    });
    createTextAt(pdf, info.educations[i].gpa, 130, leftStartY + 17 + 17 + g, {
      size: 9,
      family: "Times-Roman",
      fill: "#000000",
      width: textWidth
    });
    createTextAt(pdf, "Major Courses", 130, leftStartY + 17 + 17 + 17 + g, {
      size: 9,
      family: "Times-Roman",
      fill: "#000000",
      width: textWidth
    });
    if (info.educations[i].courses.length > 0) {
      pdf.list(info.educations[i].courses);
    }
    const heightOfResponsibilties = pdf.heightOfString(
      info.educations[i].courses,
      {
        width: textWidth - 120
      }
    );
    leftStartY = leftStartY + 17 + 17 + 17 + heightOfResponsibilties;
  }
  leftStartY += 35;

  //Create Experience
  createTextAt(pdf, "Experience", leftMargin, leftStartY, {
    size: 15,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  pdf
    .moveTo(leftMargin, leftStartY + 15)
    .lineTo(PageSize.width - leftMargin - rightMargin, leftStartY + 15)
    .strokeColor(strokeColor)
    .stroke();
  leftStartY += 25;
  for (let i = 0, g = 0; i < info.experiences.length; ++i, g += 10) {
    createTextAt(
      pdf,
      info.experiences[i].frommonth +
        " " +
        info.experiences[i].fromyear +
        " - " +
        info.experiences[i].tomonth +
        " " +
        info.experiences[i].toyear,
      leftMargin,
      leftStartY + g,
      { size: 9, family: "Helvetica-Bold", fill: "#000000" }
    );
    createTextAt(pdf, info.experiences[i].title, 130, leftStartY - 2 + g, {
      size: 12,
      family: "Helvetica-Bold",
      fill: "#000000"
    });
    createTextAt(pdf, info.experiences[i].place, 130, leftStartY + 17 + g, {
      size: 9,
      family: "Times-Italic",
      fill: "#000000"
    });
    createTextAt(
      pdf,
      info.experiences[i].responsibilities,
      130,
      leftStartY + 35 + g,
      { size: 9, family: "Times-Roman", fill: "#000000", width: textWidth }
    );
    const heightOfResponsibilties = pdf.heightOfString(
      info.experiences[i].responsibilities,
      { width: textWidth - 120 }
    );
    leftStartY = leftStartY + 35 + heightOfResponsibilties;
  }
  leftStartY += 35;

  // Create right rectangle
  pdf.rect(leftMargin2, 94, rightMargin, PageSize.height).fill(rightRectColor);

  // Create Personal info
  createTextAt(pdf, "Personal Info", leftMargin2 + leftMargin, 108, {
    size: 15,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  pdf
    .moveTo(leftMargin2 + leftMargin, 123)
    .lineTo(PageSize.width - leftMargin, 123)
    .strokeColor(strokeColor)
    .stroke();

  createTextAt(pdf, "Address", leftMargin2 + leftMargin, 138, {
    size: 9,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  createTextAt(pdf, info.user.address + ",", leftMargin2 + leftMargin, 157, {
    size: 9,
    family: "Helvetica",
    fill: "#000000"
  });
  createTextAt(
    pdf,
    info.user.city + ", " + info.user.state + " " + info.user.zipcode,
    leftMargin2 + leftMargin,
    174,
    { size: 9, family: "Helvetica", fill: "#000000" }
  );
  createTextAt(pdf, "Phone", leftMargin2 + leftMargin, 195, {
    size: 9,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  createTextAt(pdf, info.user.phone, leftMargin2 + leftMargin, 214, {
    size: 9,
    family: "Helvetica",
    fill: "#000000"
  });
  createTextAt(pdf, "Email", leftMargin2 + leftMargin, 238, {
    size: 9,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  createTextAt(pdf, info.user.email, leftMargin2 + leftMargin, 257, {
    size: 9,
    family: "Helvetica",
    fill: "#000000"
  });

  for (let i = 0, g = 0, f = 0; i < links.length; ++i, g += 15, f += 9) {
    if (links[i][1]) {
      createTextAt(pdf, links[i][0], leftMargin2 + leftMargin, 281 + g + f, {
        size: 9,
        family: "Helvetica-Bold",
        fill: "#000000"
      });
      createTextAt(pdf, links[i][1], leftMargin2 + leftMargin, 300 + g + f, {
        size: 9,
        family: "Helvetica",
        fill: "#000000"
      });
    }
  }

  //Create Hard Skills
  createTextAt(pdf, "Hard Skills", leftMargin2 + leftMargin, rightStartY, {
    size: 15,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  pdf
    .moveTo(leftMargin2 + leftMargin, rightStartY + 15)
    .lineTo(PageSize.width - leftMargin, rightStartY + 15)
    .strokeColor(strokeColor)
    .stroke();
  rightStartY += 25;

  for (let i = 0, g = 0; i < info.hardskills.length; ++i, g += 15) {
    pdf
      .circle(leftMargin2 + leftMargin + 75, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 87, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 99, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 111, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 123, rightStartY + 4 + g, 5)
      .stroke();

    for (let j = 0, k = 0; j < info.hardskills[i].level; j++, k += 12) {
      pdf
        .circle(leftMargin2 + leftMargin + 75 + k, rightStartY + 4 + g, 5)
        .fill();
    }

    createTextAt(
      pdf,
      info.hardskills[i].name,
      leftMargin2 + leftMargin,
      rightStartY + g,
      {
        size: 9,
        family: "Helvetica",
        fill: "#000000"
      }
    );
    createTextAt(
      pdf,
      info.hardskills[i].proficiency,
      leftMargin2 +
        leftMargin +
        125 -
        pdf.widthOfString(info.hardskills[i].proficiency),
      rightStartY + 15 + g,
      { size: 9, family: "Helvetica", fill: "#000000" }
    );
    rightStartY += 20;
  }

  rightStartY += 45;

  //Create Soft Skills
  createTextAt(pdf, "Soft Skills", leftMargin2 + leftMargin, rightStartY, {
    size: 15,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  pdf
    .moveTo(leftMargin2 + leftMargin, rightStartY + 15)
    .lineTo(PageSize.width - leftMargin, rightStartY + 15)
    .strokeColor(strokeColor)
    .stroke();
  rightStartY += 25;

  for (let i = 0, g = 0; i < info.softskills.length; ++i, g += 15) {
    pdf
      .circle(leftMargin2 + leftMargin + 75, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 87, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 99, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 111, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 123, rightStartY + 4 + g, 5)
      .stroke();

    for (let j = 0, k = 0; j < info.softskills[i].level; j++, k += 12) {
      pdf
        .circle(leftMargin2 + leftMargin + 75 + k, rightStartY + 4 + g, 5)
        .fill();
    }

    createTextAt(
      pdf,
      info.softskills[i].name,
      leftMargin2 + leftMargin,
      rightStartY + g,
      {
        size: 9,
        family: "Helvetica",
        fill: "#000000"
      }
    );
    createTextAt(
      pdf,
      info.softskills[i].proficiency,
      leftMargin2 +
        leftMargin +
        125 -
        pdf.widthOfString(info.softskills[i].proficiency),
      rightStartY + 15 + g,
      { size: 9, family: "Helvetica", fill: "#000000" }
    );
    rightStartY += 20;
  }

  rightStartY += 30;

  //Create Languages
  createTextAt(pdf, "Languages", leftMargin2 + leftMargin, rightStartY, {
    size: 15,
    family: "Helvetica-Bold",
    fill: "#000000"
  });
  pdf
    .moveTo(leftMargin2 + leftMargin, rightStartY + 15)
    .lineTo(PageSize.width - leftMargin, rightStartY + 15)
    .strokeColor(strokeColor)
    .stroke();
  rightStartY += 25;

  for (let i = 0, g = 0; i < info.languages.length; ++i, g += 15) {
    pdf
      .circle(leftMargin2 + leftMargin + 75, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 87, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 99, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 111, rightStartY + 4 + g, 5)
      .circle(leftMargin2 + leftMargin + 123, rightStartY + 4 + g, 5)
      .stroke();

    for (let j = 0, k = 0; j < info.languages[i].level; j++, k += 12) {
      pdf
        .circle(leftMargin2 + leftMargin + 75 + k, rightStartY + 4 + g, 5)
        .fill();
    }

    createTextAt(
      pdf,
      info.languages[i].name,
      leftMargin2 + leftMargin,
      rightStartY + g,
      {
        size: 9,
        family: "Helvetica",
        fill: "#000000"
      }
    );
    createTextAt(
      pdf,
      info.languages[i].proficiency,
      leftMargin2 +
        leftMargin +
        125 -
        pdf.widthOfString(info.languages[i].proficiency),
      rightStartY + 15 + g,
      { size: 9, family: "Helvetica", fill: "#000000" }
    );
    rightStartY += 20;
  }

  pdf.end();
  pdf.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    cb(pdfData);
  });
};

function createTextAt(pdf, t, x, y, z) {
  const PageSize = {
    width: pdf.page.width,
    height: pdf.page.height
  };
  const leftMargin = 26;
  const rightMargin = 300;
  const style = Object.assign(
    {},
    {
      size: 10,
      fill: "#FFFFFF",
      family: "Times-Roman",
      width: PageSize.width - leftMargin - rightMargin,
      lineGap: 5
    },
    z
  );
  pdf.fill(style.fill);
  pdf.fontSize(style.size);
  pdf.font(style.family).text(t, x, y, {
    width: style.width,
    lineGap: style.lineGap
  });
}
module.exports = createPDF;
