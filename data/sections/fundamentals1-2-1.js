HR.registerSection({
 "id": "fundamentals1-2-1",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-2-1-o1",
   "description": "Distinguish theoretical computation, physical computing, and the establishment of AI as a research field.",
   "pages": [
    11,
    12
   ]
  }
 ],
 "notes": [
  {
   "heading": "Three different contributions",
   "pages": [
    11,
    12
   ],
   "bullets": [
    "A Turing machine is an abstract model for reasoning about algorithms: a tape stores symbols, a read/write head accesses them, and a finite-state controller chooses operations from the current state and symbol. It is a mathematical model, not a manufactured computer.",
    "ENIAC illustrates the physical implementation of electronic computation. The source describes vacuum-tube hardware and uses such as numerical trajectory calculations. Its historical role is different from defining what an algorithm can compute.",
    "The Dartmouth workshop gave the AI research agenda a name and brought together researchers interested in learning, reasoning, and problem solving. Naming a research field did not itself deliver a general intelligent machine.",
    "Worked comparison: a paper proving whether an algorithm can solve a problem concerns computation theory; a machine performing calculations concerns implementation; an organized program to investigate intelligent behavior concerns the AI field. Do not use these milestones interchangeably."
   ],
   "objectiveIds": [
    "fundamentals1-2-1-o1"
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
    "id": "fundamentals1-2-1-pre-01",
    "type": "single",
    "stem": "A researcher studies an idealized tape, read/write head, and finite-state controller. What is being described?",
    "options": [
     {
      "key": "A",
      "text": "An electronic calculator implementation"
     },
     {
      "key": "B",
      "text": "An abstract model of computation"
     },
     {
      "key": "C",
      "text": "A trained neural network"
     },
     {
      "key": "D",
      "text": "A symbolic knowledge base"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The Turing machine formalizes computation using these abstract components. It is not a particular electronic device or trained model.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      11
     ]
    },
    "objectiveIds": [
     "fundamentals1-2-1-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-2-1-post-01",
    "type": "multi",
    "stem": "Which distinctions follow the source history? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "The Turing machine formalizes algorithmic computation"
     },
     {
      "key": "B",
      "text": "ENIAC illustrates physical electronic computation"
     },
     {
      "key": "C",
      "text": "Dartmouth established that general intelligence had already been implemented"
     },
     {
      "key": "D",
      "text": "An abstract computation model is the same thing as a manufactured computer"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "The first two describe different theoretical and engineering contributions. Dartmouth established a research direction, not a completed general intelligence; abstract models and physical implementations are distinct.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      11,
      12
     ]
    },
    "objectiveIds": [
     "fundamentals1-2-1-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-2-1-summative-01",
    "type": "single",
    "stem": "A presentation credits one event with both defining an abstract computation model and organizing AI as a named research field. How should the explanation be corrected?",
    "options": [
     {
      "key": "A",
      "text": "Assign both contributions to the construction of ENIAC"
     },
     {
      "key": "B",
      "text": "Treat the workshop as the physical implementation of the tape model"
     },
     {
      "key": "C",
      "text": "Distinguish Turing's model from the Dartmouth research workshop"
     },
     {
      "key": "D",
      "text": "Treat AI as a field created by the first successful neural-network benchmark"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The source separates the abstract computation model from the workshop that established the named AI research field. Neither should be replaced by an unrelated benchmark milestone.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      11,
      12
     ]
    },
    "objectiveIds": [
     "fundamentals1-2-1-o1"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-1",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
