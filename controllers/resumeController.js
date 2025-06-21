const pdfParse = require("pdf-parse");
const { getHTMLContent } = require("../utils/resume");

const OpenAI = require("openai");
const client = new OpenAI();

exports.getResume = async (req, res) => {
  try {
    if (!req.file || !req.body.text) {
      return res
        .status(400)
        .json({ message: "PDF file and text are required" });
    }

    const parsed = await pdfParse(req.file.buffer);

    const prompt = `
      you are exceptional resume maker, you can help create resumes that 100% impress the HR or manager.

      add quantifiable measures as much as possible in responsibilities

      Given the following resume content and job description, make appropriate updates to the resume so it aligns with the job description.
      i want you understand the resume of the user and then change it to suit the job description that will have relevance to the description by 100% . and return in a stringified json.

      make a not not to add any additonal skills not listed in the resume.

      Resume Content:
      ${parsed.text}

      Job Description:
      ${req.body.text}

      console.log(parsed, jobDescription)

      i want you to return the data in a strigified json in format like this:
        {
            name: '',
            email: '',
            phone: '',
            linkedinUrl: '',
            githubUrl: '',
            location: '',
            portfolioWebsite: '',
            skills: {'Frameworks & Libraries' : [''], 'Languages' : [''], 'Tools': [''], 'Other' : ['']},
            experience : [{company: '', role: '', yearfrom : '', yearto: '', responsibilities: [''], location: ''}],
            education : [{college: '', yearfrom : '', yearto: '', degree: '', location: ''}],
            acheivements : [{year: 2000, description: ''}],
        }
    `;

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });

    const updatedContent = response.output_text.trim();

    console.log("!!! chatGptResponse", updatedContent);

    const jsonStartIndex = updatedContent.indexOf("{");
    const jsonEndIndex = updatedContent.lastIndexOf("}") + 1;
    const jsonString = updatedContent.slice(jsonStartIndex, jsonEndIndex);
    let parsedData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return res.status(500).json({
        error: "Failed to parse JSON from ChatGPT response",
      });
    }
    const generatedHTML = getHTMLContent(parsedData);
    res.json({
      data: parsedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "PDF parsing error", error: err });
  }
};
