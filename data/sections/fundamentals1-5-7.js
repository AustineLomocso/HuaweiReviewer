HR.registerSection({
 "id": "fundamentals1-5-7",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-5-7-o1",
   "description": "Connect dataset curation, training standards, and deployment oversight to responsible AI.",
   "pages": [
    38,
    39
   ]
  }
 ],
 "notes": [
  {
   "heading": "Responsibility before, during, and after training",
   "pages": [
    38,
    39
   ],
   "bullets": [
    "Before training, curate systematic datasets and consider edge cases and counterexamples. During training, use clear, consistent, transparent standards. After training, provide oversight and defined accountability for failures and misuse.",
    "The source groups trustworthy-AI principles around human-centricity, fairness, transparency, security/reliability, and accountability. These principles can interact and require explicit choices in a real application.",
    "The Three Laws of Robotics are presented as an illustrative ethical framework. They are not proof that a real system can resolve every value conflict or guarantee safety.",
    "Worked application: a biased deployed model calls for more than changing a model file. Review dataset omissions, the standards used to evaluate it, and who monitors and addresses harmful outcomes."
   ],
   "objectiveIds": [
    "fundamentals1-5-7-o1"
   ]
  }
 ],
 "assessmentBlueprint": {
  "pre": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "post": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "summative": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  }
 },
 "tests": {
  "pre": [
   {
    "id": "fundamentals1-5-7-pre-01",
    "type": "single",
    "stem": "Which activity belongs before training in the source lifecycle?",
    "options": [
     {
      "key": "A",
      "text": "Assigning only a public-facing product name"
     },
     {
      "key": "B",
      "text": "Building datasets that include edge cases and counterexamples"
     },
     {
      "key": "C",
      "text": "Replacing all evaluation with deployment monitoring"
     },
     {
      "key": "D",
      "text": "Defining responsibility only after a failure occurs"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The source explicitly places systematic dataset design, including edge cases and counterexamples, before training.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      38
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-7-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-5-7-post-01",
    "type": "multi",
    "stem": "Which lifecycle assignments match the source? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Before training: careful dataset construction"
     },
     {
      "key": "B",
      "text": "During training: clear and transparent standards"
     },
     {
      "key": "C",
      "text": "After training: oversight and accountability"
     },
     {
      "key": "D",
      "text": "After training: responsibility ends when the model is released"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "The source describes an ongoing lifecycle with post-training oversight. Release is not the end of responsibility.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      38
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-7-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-5-7-summative-01",
    "type": "tf",
    "stem": "The Three Laws of Robotics on the slide should be treated as a demonstrated technical guarantee that deployed AI cannot cause harm.",
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
    "explanation": "They are an ethical illustration, while the lesson calls for concrete curation, standards, oversight, and accountability. A stated principle is not a demonstrated guarantee.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      38,
      39
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-7-o1"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-4",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
