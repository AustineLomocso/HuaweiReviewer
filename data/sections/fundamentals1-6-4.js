HR.registerSection({
 "id": "fundamentals1-6-4",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-6-4-o1",
   "description": "Use critical questioning and algorithmic understanding to evaluate tools.",
   "pages": [
    44,
    49
   ]
  },
  {
   "id": "fundamentals1-6-4-o2",
   "description": "Interpret the numerical-representation illustration and connect practice with reflection.",
   "pages": [
    44,
    49
   ]
  }
 ],
 "notes": [
  {
   "heading": "Learning beyond memorized tool instructions",
   "pages": [
    44,
    45
   ],
   "bullets": [
    "The source recommends questioning assumptions, comparing arguments, and understanding principles and algorithms. Tool interfaces can change; underlying concepts help transfer knowledge to unfamiliar tools.",
    "The discussion prompts include moral dilemmas, privacy, inequality, and bias. These are invitations to analyze competing claims and values, not a supplied answer key for one universally correct social position.",
    "Worked application: when a generated answer is persuasive, ask what assumptions it uses and what evidence could contradict it. Being able to operate the interface is different from being able to evaluate its output."
   ],
   "objectiveIds": [
    "fundamentals1-6-4-o1"
   ]
  },
  {
   "heading": "Representations, context, and practice",
   "pages": [
    46,
    49
   ],
   "bullets": [
    "The diagram depicts input passing through an encoder, numerical representations, and a decoder that produces output. It illustrates processing representations rather than literally storing human experiences inside a machine.",
    "The two tables give the word Apple different numerical values in different sentence examples. Read this as an illustration that representation can depend on context, not as a universal embedding vector or a formula to memorize.",
    "Practice should include trying a task, noticing errors or gaps in understanding, and reflecting on the result. The source also encourages regular learning and prompt engineering. A prescribed daily duration or website list is not the learning objective.",
    "Worked application: compare an ambiguous word in two sentences and ask why its useful representation might differ. Then test a prompt, inspect the output, and refine the task description rather than assuming the first result is correct."
   ],
   "objectiveIds": [
    "fundamentals1-6-4-o2"
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
    "id": "fundamentals1-6-4-pre-01",
    "type": "single",
    "stem": "Which study approach best matches the source's emphasis on lasting understanding?",
    "options": [
     {
      "key": "A",
      "text": "Memorize one interface without examining its assumptions"
     },
     {
      "key": "B",
      "text": "Accept confident output before checking its reasoning"
     },
     {
      "key": "C",
      "text": "Compare assumptions and learn the principles behind the tool"
     },
     {
      "key": "D",
      "text": "Use the newest product name as evidence of correctness"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The source emphasizes critical thinking and algorithmic principles rather than superficial familiarity with tools.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      44
     ]
    },
    "objectiveIds": [
     "fundamentals1-6-4-o1"
    ]
   },
   {
    "id": "fundamentals1-6-4-pre-02",
    "type": "tf",
    "stem": "The numerical values in the two Apple examples should be memorized as a universal vector for that word.",
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
    "explanation": "The diagram illustrates representations in different sentence contexts; it does not define a universal vector to memorize.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      46
     ]
    },
    "objectiveIds": [
     "fundamentals1-6-4-o2"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-6-4-post-01",
    "type": "multi",
    "stem": "Which actions follow the source's learning advice? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Question assumptions in an answer"
     },
     {
      "key": "B",
      "text": "Compare reasoning from different perspectives"
     },
     {
      "key": "C",
      "text": "Treat tool familiarity as sufficient understanding"
     },
     {
      "key": "D",
      "text": "Avoid examples that expose gaps in knowledge"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "The source favors questioning, debate, principles, and recognizing gaps. Familiarity alone and avoiding mistakes work against that advice.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      44,
      47
     ]
    },
    "objectiveIds": [
     "fundamentals1-6-4-o1"
    ]
   },
   {
    "id": "fundamentals1-6-4-post-02",
    "type": "single",
    "stem": "What is the most useful lesson of the encoder/decoder illustration?",
    "options": [
     {
      "key": "A",
      "text": "Words are represented and processed numerically within the illustrated pipeline"
     },
     {
      "key": "B",
      "text": "Every language task uses the exact numbers shown on this slide"
     },
     {
      "key": "C",
      "text": "A decoder guarantees that an answer is factually correct"
     },
     {
      "key": "D",
      "text": "The same word must receive identical values in every context"
     }
    ],
    "answer": [
     "A"
    ],
    "explanation": "The diagram illustrates numerical representations and processing; its examples do not establish universal numbers, context independence, or guaranteed correctness.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      46
     ]
    },
    "objectiveIds": [
     "fundamentals1-6-4-o2"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-6-4-summative-01",
    "type": "single",
    "stem": "A student can reproduce tool commands but cannot explain why a result is wrong. Which next step best addresses the gap?",
    "options": [
     {
      "key": "A",
      "text": "Repeat the commands without examining their outputs"
     },
     {
      "key": "B",
      "text": "Memorize a larger collection of command sequences"
     },
     {
      "key": "C",
      "text": "Use only examples that reproduce familiar results"
     },
     {
      "key": "D",
      "text": "Study the method and test its assumptions"
     }
    ],
    "answer": [
     "D"
    ],
    "explanation": "The lesson prioritizes principles, critical questioning, and practice that exposes misunderstandings.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      44,
      47
     ]
    },
    "objectiveIds": [
     "fundamentals1-6-4-o1"
    ]
   },
   {
    "id": "fundamentals1-6-4-summative-02",
    "type": "multi",
    "stem": "Which practices connect experimentation with understanding? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Try a concrete task"
     },
     {
      "key": "B",
      "text": "Identify what failed or remains unclear"
     },
     {
      "key": "C",
      "text": "Revise the approach using the observed result"
     },
     {
      "key": "D",
      "text": "Count every generated answer as a validated solution"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "Practice, recognizing gaps, and reflection support learning. Generated output still needs evaluation.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      46,
      47
     ]
    },
    "objectiveIds": [
     "fundamentals1-6-4-o2"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-3-3",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
