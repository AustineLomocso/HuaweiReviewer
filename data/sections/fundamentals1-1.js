HR.registerSection({
 "id": "fundamentals1-1",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-1-o1",
   "description": "Identify capabilities underlying everyday AI applications.",
   "pages": [
    1,
    9
   ]
  },
  {
   "id": "fundamentals1-1-o2",
   "description": "Interpret named foundation-model examples as source-edition illustrations.",
   "pages": [
    1,
    9
   ]
  }
 ],
 "notes": [
  {
   "heading": "From a technology label to a concrete capability",
   "pages": [
    1,
    7
   ],
   "bullets": [
    "The opening places AI after earlier changes in agriculture, connectivity, and data use. Treat the era diagram as motivation; the substantive skill is identifying what a system does.",
    "Recognition systems turn speech, faces, images, or other observations into useful classifications or interpretations. Recommendation systems rank or suggest items. Generative systems produce outputs such as text, images, or code. Robotics adds interaction with a physical environment.",
    "The same application may combine capabilities. A customer-service assistant might recognize speech, interpret a request, retrieve information, and generate a reply. Naming it AI does not explain which part performs which function.",
    "Worked comparison: extracting the main points from meeting notes is summarization; converting the notes into another language is translation. Both are language tasks, but their success criteria differ. Evaluate the actual requested capability."
   ],
   "objectiveIds": [
    "fundamentals1-1-o1"
   ]
  },
  {
   "heading": "Pangu and the model landscape in this edition",
   "pages": [
    8,
    9
   ],
   "bullets": [
    "The Pangu example emphasizes Chinese-language optimization, multiple model families, and adaptation to industry scenarios. Its examples include customer Q&A, document assistance, forecasting, and coding.",
    "The model landscape lists multiple providers and model names. These are examples in the supplied edition, not an exhaustive current ranking or a promise that every listed model supports every task.",
    "The source uses broad large-model language while discussing CV, NLP, multimodal, and coding families. Preserve that breadth rather than assuming all examples are text-only language models.",
    "Worked application: for an industry workflow, identify the input, required output, domain knowledge, and evaluation criteria before selecting a model family. Brand recognition alone cannot establish fit."
   ],
   "objectiveIds": [
    "fundamentals1-1-o2"
   ]
  }
 ],
 "assessmentBlueprint": {
  "pre": {
   "count": 2,
   "rationale": "2 authored items assess 2 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "post": {
   "count": 2,
   "rationale": "2 authored items assess 2 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "summative": {
   "count": 2,
   "rationale": "2 authored items assess 2 objective(s) at this source scope; parent assessments add integrated practice."
  }
 },
 "tests": {
  "pre": [
   {
    "id": "fundamentals1-1-pre-01",
    "type": "single",
    "stem": "A system creates a concise account of the main points in a meeting transcript. Which capability best describes the requested result?",
    "options": [
     {
      "key": "A",
      "text": "Summarization"
     },
     {
      "key": "B",
      "text": "Language translation"
     },
     {
      "key": "C",
      "text": "Speaker authentication"
     },
     {
      "key": "D",
      "text": "Physical robot control"
     }
    ],
    "answer": [
     "A"
    ],
    "explanation": "The output condenses the transcript's content. Translation changes language, authentication checks identity, and robot control concerns physical action.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      7
     ]
    },
    "objectiveIds": [
     "fundamentals1-1-o1"
    ]
   },
   {
    "id": "fundamentals1-1-pre-02",
    "type": "tf",
    "stem": "The source's list of model names establishes that all listed systems have identical capabilities.",
    "options": [
     {
      "key": "T",
      "text": "True"
     },
     {
      "key": "F",
      "text": "False"
     }
    ],
    "answer": [
     "F"
    ],
    "explanation": "The landscape illustrates multiple models and families. A name list does not establish identical functions or suitability for every scenario.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      8,
      9
     ]
    },
    "objectiveIds": [
     "fundamentals1-1-o2"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-1-post-01",
    "type": "multi",
    "stem": "Which are AI application examples given in the source? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Personalized recommendations"
     },
     {
      "key": "B",
      "text": "Image recognition"
     },
     {
      "key": "C",
      "text": "Machine translation"
     },
     {
      "key": "D",
      "text": "A proof that every automated process is intelligent"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "The source lists recommendation, image recognition, and translation. It does not prove that automation alone is sufficient to characterize intelligence.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      6
     ]
    },
    "objectiveIds": [
     "fundamentals1-1-o1"
    ]
   },
   {
    "id": "fundamentals1-1-post-02",
    "type": "single",
    "stem": "An organization considers the Pangu example for a specialist workflow. Which source emphasis is relevant?",
    "options": [
     {
      "key": "A",
      "text": "One identical model for every possible task"
     },
     {
      "key": "B",
      "text": "Only text generation with no other model families"
     },
     {
      "key": "C",
      "text": "Industry adaptation and multiple model capabilities"
     },
     {
      "key": "D",
      "text": "A current universal ranking over every competing model"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The source emphasizes industry readiness and CV, NLP, multimodal, and coding families. It does not establish a universal current ranking or identical treatment of every task.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      8
     ]
    },
    "objectiveIds": [
     "fundamentals1-1-o2"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-1-summative-01",
    "type": "single",
    "stem": "A voice customer-service system recognizes speech and then produces a written reply. How should its capability be analyzed?",
    "options": [
     {
      "key": "A",
      "text": "As one indivisible function inferred from its brand"
     },
     {
      "key": "B",
      "text": "As a combination of recognition and generation tasks"
     },
     {
      "key": "C",
      "text": "As physical manipulation because the input is sound"
     },
     {
      "key": "D",
      "text": "As proof of general intelligence because two tasks are present"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The source's application examples support distinguishing component capabilities. Combining tasks is not itself proof of general intelligence.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      6,
      7
     ]
    },
    "objectiveIds": [
     "fundamentals1-1-o1"
    ]
   },
   {
    "id": "fundamentals1-1-summative-02",
    "type": "multi",
    "stem": "Which questions help turn a model example into a meaningful application choice? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "What input and output does the workflow require?"
     },
     {
      "key": "B",
      "text": "What industry context must the system handle?"
     },
     {
      "key": "C",
      "text": "Does the displayed model name alone prove suitability?"
     },
     {
      "key": "D",
      "text": "Can the source's examples identify relevant capability families?"
     }
    ],
    "answer": [
     "A",
     "B",
     "D"
    ],
    "explanation": "Task requirements, domain context, and capability families inform the choice. A model name alone does not establish fitness for the application.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      8,
      9
     ]
    },
    "objectiveIds": [
     "fundamentals1-1-o2"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-2",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
