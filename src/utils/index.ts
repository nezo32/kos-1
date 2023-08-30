export function stringFirstToUpper(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function valueByPath(json: any, path: string) {
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  const pathArray = path.split(".");

  for (let i = 0, n = pathArray.length; i < n; ++i) {
    let key = pathArray[i]!;

    if (key in json) {
      if (json[key] !== null) {
        json = json[key];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return json;
}

export function exportAsCSV(head: string[], content: string[][]) {
  let data = head.map((el) => `"${el}"`).join(",") + "\n";

  content.forEach((el) => {
    data += el.map((v) => `"${v}"`).join(",") + "\n";
  });

  const blob = new Blob([data], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "export.csv");
  a.click();
}
