const getHTMLContent = (data) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        #app,
        #content,
        body,
        html {
            width: 100%;
            height: 100%;
            outline: 0px !important;
        }

        body,
        html {
            scroll-behavior: smooth;
            width: 940px;
        }

        body {
            background: repeat fixed rgb(250, 251, 253);
            margin: 0px;
        }


        *,
        ::after,
        ::before {
            box-sizing: border-box;
        }

        ::after,
        ::before {
            box-sizing: border-box;
        }

        * {
            box-sizing: border-box;
        }


        .resume-renderer {
            line-height: normal;
            width: 940px;
            line-height: normal;
            position: relative;
        }

        .resume-renderer-page {
            padding: 28px 28px 0px;
            background-color: rgb(255, 255, 255);
            box-shadow: rgba(83, 83, 83, 0.5) 0px 0px 2px 0px;
            margin-bottom: 40px;
            position: relative;
            // height: 1330px;
            break-after: page;
        }

        .resume-page-wrapper {
            position: relative;
        }

        .header-container {
            margin-bottom: 6px;
            padding: 6px 12px;
            border-radius: 5px;
            border: 1px solid transparent;
            justify-content: center;
            display: flex;
            flex-flow: wrap;
        }

        .editable-field {
            background: transparent;
            border: 0px;
            box-shadow: none;
            display: block;
            margin: 0px;
            min-height: 10px;
            outline: none;
            padding: 0px;
            resize: none;
            overflow-wrap: break-word;
            text-size-adjust: none;
            letter-spacing: normal;
            list-style: none;
            position: relative;
            word-break: break-word;
            z-index: 1;
        }

        .font-weight-700 {
            font-weight: 700;
        }

        .bullet::before {
            content: "\a ";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: rgb(56, 67, 71);
            display: inline-block;
            position: relative;
            vertical-align: middle;
        }

        .resume-name {
            white-space: pre-wrap;
            font-family: Bitter, Arial, Helvetica, "Noto Sans Devanagari", "Noto Sans CJK SC Thin", "Noto Sans SC", "Noto Sans Hebrew", sans-serif;
            text-transform: uppercase;
            color: rgb(0, 0, 0);
            font-size: 22px;
            line-height: 26px;
            min-width: 2px;
            overflow: hidden;
            display: block;
            width: 100%;
        }
    .body-container {
    width: 100%;}

        .text-center {
            text-align: center;
        }

        .resume-metadata-container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: wrap;
            margin-top: 10px;
        }

        .metadata {
            width: auto;
            min-width: 2px;
            padding-right: 10px;
            padding-left: 10px;
            color: rgb(56, 67, 71);
            font-size: 13px;
            line-height: 15px;
        }

        .sectionTitle {
            border-bottom: 1px solid rgb(56, 67, 71);
            font-size: 18px;
            line-height: 22px;
            font-weight: 700;
            padding: 8px 12px 5px;
            color: #000000
        }

        .sectionContainer {
            padding: 6px 12px;
            border-radius: 5px;
            color: rgb(56, 67, 71);
            font-size: 14px;
            margin-bottom: 18px;
        }

        .skills-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .skill-title {
            font-weight: 700;
        }

        .work-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .work-primary-title {
            display: flex;
            justify-content: space-between;
            font-weight: 700;
            margin-top: 12px;
        }

        .work-secondary-title {
            display: flex;
            justify-content: space-between;
            font-style: italic;
            margin-top: 6px;
        }

        .work-description-point-wrapper {
            display: inline-flex;
        }

        .work-description-point {
            margin-left: 4px;
        }

        .work-description-point-bullet {
            margin-right: 6px;
        }

        .achievement-item-year {
            font-weight: 700;
        }

        .achievement-item-wrapper {
            display: flex;
            gap: 10px;
        }
    </style>
</head>

<body>
<div class="resume-renderer center-resume">
    <div class="resume-renderer-page">
        <div class="resume-page-wrapper">
            <div class="header-container">
                <div class="resume-name editable-field font-weight-700 text-center">${
                  data.name
                }</div>
                <div class="resume-metadata-container">
                <div class="mobileNumber metadata editable-field">${
                  data.phone
                } ${data.email ? "| " + data.email : ""} ${
    data.linkedinUrl ? "| " + data.linkedinUrl : ""
  } ${data.portfolioWebsite ? "| " + data.portfolioWebsite : ""}</div>
                </div>    
            </div>
            <div class="body-container">
                <div class="sectionTitle editable-field">SKILLS & INTERESTS</div>
                <div class="sectionContainer skills-container">
                    <div class="framework-skill skill-text  editable-field "> <span class="skill-title">Frameworks &
                            Libraries:</span> ${data.skills[
                              "Frameworks & Libraries"
                            ].join(", ")}</div>
                    <div class="languages-skill skill-text  editable-field"> <span
                            class="skill-title">Languages:</span>${data.skills.Languages.join(
                              ", "
                            )}</div>
                    <div class="tools-skill skill-text  editable-field"> <span class="skill-title">Tools:</span>
                        ${data.skills.Tools.join(", ")}</div>
                </div>
                <div class="sectionTitle editable-field">WORK EXPERIENCE</div>
                <div class="sectionContainer work-container">
                    ${data.experience
                      .map(
                        (exp) =>
                          `<div class="work-primary-title">
                            <div class="company-name editable-field">${
                              exp.company
                            }</div>
                            <div class="work-location editable-field">${
                              exp.location
                            }</div>
                        </div>
                        <div class="work-secondary-title">
                            <div class="work-position editable-field">${
                              exp.role
                            }</div>
                            <div class="work-time editable-field">${
                              exp.yearfrom
                            } - ${exp.yearto}</div>
                        </div>
                        <div class="work-description">
                            ${exp.responsibilities
                              .map(
                                (res) => `
                            <div class="work-description-point-wrapper">
                                <div class="work-description-point-bullet">&#8226</div>
                                <div class="work-description-point"> ${res}</div>
                            </div>
                            `
                              )
                              .join("")}
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <div class="sectionTitle editable-field">EDUCATION</div>
                <div class="sectionContainer education-container">
                    ${data.education
                      .map(
                        (edu) => `
                        <div class="work-primary-title">
                            <div class="company-name editable-field">${edu.college}</div>
                            <div class="work-location editable-field">${edu.location}</div>
                        </div>
                        <div class="work-secondary-title">
                            <div class="work-position editable-field">${edu.degree} </div>
                            <div class="work-time editable-field">Graduation Date: ${edu.yearto}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
  `;

  return html;
};

module.exports = { getHTMLContent };
