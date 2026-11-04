(function (root) {
  root.HR = root.HR || {};
  const data = { structure: null, manifest: {}, sections: {}, mocks: {} };
  root.HR.data = data;
  root.HR.registerStructure = (s) => { data.structure = s; };
  root.HR.registerManifest = (m) => { data.manifest = m; };
  root.HR.registerSection = (s) => { data.sections[s.id] = s; };
  root.HR.registerMock = (m) => { data.mocks[m.id] = m; };
})(globalThis);
