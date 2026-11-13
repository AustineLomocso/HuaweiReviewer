HR.registerSection({
 "id": "fundamentals1-3-1",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-3-1-o1",
   "description": "Explain explicit knowledge representation and reasoning, including its limitations.",
   "pages": [
    24,
    25
   ]
  }
 ],
 "notes": [
  {
   "heading": "From entities to a knowledge base and reasoning engine",
   "pages": [
    24,
    25
   ],
   "bullets": [
    "Symbolic AI represents entities and concepts with symbols and encodes rules, facts, theorems, or relationships explicitly. A reasoning engine operates over the knowledge base to derive conclusions. The diagram separates stored knowledge from the mechanism that reasons with it.",
    "Examples include expert systems, theorem proving, and knowledge graphs. The source emphasizes precision, rigor, and interpretability: the path from premises to conclusion can often be inspected.",
    "The difficult part is constructing an adequate representation of the world. Missing rules, conflicting facts, semantic ambiguity, and changing conditions can undermine otherwise rigorous reasoning.",
    "Worked application: a rule-driven eligibility checker should explain the facts and rules behind a decision. A logically valid conclusion can still be wrong in practice if its input facts or encoded policy are incomplete.",
    "The Turing-test discussion concerns judged conversational behavior. The accompanying Chinese Room critique questions whether such behavior establishes understanding. Treat the reported chatbot result and numerical threshold as source context rather than a universal proof of consciousness."
   ],
   "objectiveIds": [
    "fundamentals1-3-1-o1"
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
    "id": "fundamentals1-3-1-pre-01",
    "type": "single",
    "stem": "Which pair of components is central to the expert-system diagram?",
    "options": [
     {
      "key": "A",
      "text": "A reward signal and a physical actuator"
     },
     {
      "key": "B",
      "text": "A reasoning engine and a knowledge base"
     },
     {
      "key": "C",
      "text": "A convolution kernel and a pooling layer"
     },
     {
      "key": "D",
      "text": "A tokenizer and an audio decoder"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The diagram shows a reasoning engine operating with a knowledge base. The other pairs illustrate different architectures or functions.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-1-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-3-1-post-01",
    "type": "multi",
    "stem": "Which problems can remain in a symbolic system despite precise logical inference? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Missing facts or rules"
     },
     {
      "key": "B",
      "text": "Conflicting representations"
     },
     {
      "key": "C",
      "text": "Ambiguous meanings"
     },
     {
      "key": "D",
      "text": "A requirement that every rule be learned as a neural weight"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "The source highlights omissions, conflicts, and semantic ambiguity. Symbolic knowledge is explicitly represented rather than necessarily stored as learned neural weights.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-1-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-3-1-summative-01",
    "type": "tf",
    "stem": "An interpretable chain of symbolic deductions guarantees that the original knowledge base contains every relevant fact.",
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
    "explanation": "Interpretability concerns the reasoning path. Incomplete abstraction, missing knowledge, and changing conditions can still limit the knowledge base.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-1-o1"
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
