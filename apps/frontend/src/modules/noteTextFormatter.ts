const formaterText = (text: string) => {
  const regexpScript: RegExp =
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const regexpNewLine: RegExp = /\n/g;
  const regexpLink: RegExp = /\[l]\((.*?)\)(.*?)\[\/l]/g;
  const regexpBold: RegExp = /\[b](.*?)\[\/b]/g;
  const regexpItalic: RegExp = /\[i](.*?)\[\/i]/g;
  const regexpUnderline: RegExp = /\[u](.*?)\[\/u]/g;
  const regexpSuperior: RegExp = /\[sp](.*?)\[\/sp]/g;
  const regexpSub: RegExp = /\[sb](.*?)\[\/sb]/g;
  const regexpMark: RegExp = /\[mark](.*?)\[\/mark]/g;
  const regexpBig: RegExp = /\[big](.*?)\[\/big]/g;
  const regexpSmall: RegExp = /\[small](.*?)\[\/small]/g;
  const regexpUnorderedList: RegExp = /\[ul]((?:(?!\[\/ul])[\s\S])*)\[\/ul]/g;
  const regexpOrderedList: RegExp = /\[ol]((?:(?!\[\/ol])[\s\S])*)\[\/ol]/g;
  const regexpListItem: RegExp = /\[li](.*?)\[\/li]/g;
  const regexpQuote: RegExp =
    /\[quote]\((.*?)\)((?:(?!\[\/quote])[\s\S])*)\[\/quote]/g;
  const regexpInlineQuote: RegExp = /\[q](.*?)\[\/q]/g;
  //Color Tag
  const regexpColorRGB: RegExp =
    /\[rgb\]\((\d+),(\d+),(\d+)\)((?:(?!\[\/rgb])[\s\S])*)\[\/rgb]/g;
  const regexpColorHSL: RegExp =
    /\[hsl]\((\d+),(\d+)%,(\d+)%\)((?:(?!\[\/hsl])[\s\S])*)\[\/hsl]/g;
  const regexpColorHEX: RegExp =
    /\[hex]\(#(.*?)\)((?:(?!\[\/hex])[\s\S])*)\[\/hex]/g;
  //JavaScript Code
  const regexpJSVariables = /\b(var|let|const)\b/g;
  const regexpJSKeywords = /\b(export|default|new|class|extends)\b/g;
  const regexpJSControlFlow = /\b(if|else|switch|case)\b/g;
  const regexpJSLoop = /\b(for|while|do|break)\b/g;
  const regexpJSReturn = /\b(return)\b/g;
  const regexpJSFunction = /\b(function)\b/g;
  const regexpJSMethod = /(\w+)\((.*?)\)/g;
  const regexpJSProps = /(\w+)\.(.*?)/g;
  const regexpJSValues = /\b(null|undefined|true|false)\b/g;
  const regexpJSString = /(?<=[\s|(|\[|,|:])(".*?"|'.*?')/g;
  const regexpJSArray = /(?<=[=\s])([\[.*?][/\]])/g;
  const regexpJSClass = /(?<=class\s)(.*?)(?=\{)/g;
  const regexpJSClassInstance = /(?<=new\s)(.*?)(?=[\(\)])/g;
  const regexpJSComments = /(^\s*\/\/.*$)/gm;
  const regexpJSConstructor = /\b(constructor)\b/g;
  const regexpCodeJS: RegExp =
    /\[code javascript]((?:(?!\[\/code])[\s\S])*)\[\/code]/g;
  //Python Code
  const regexpPYVariables = /(\S*[a-z]\s)(?==)/g;
  const regexpPYConstant = /(\S*[A-Z]\s)(?==)/g;
  const regexpPYKeywords = /\b(class|is|not|and|or)\b/g;
  const regexpPYControlFlow = /\b(if|else|elif|switch|case)\b/g;
  const regexpPYLoop = /\b(for|while|do|break|in)\b/g;
  const regexpPYReturn = /\b(return)\b/g;
  const regexpPYFunction = /\b(def)\b/g;
  const regexpPYMethod = /(\w+)\((.*?)\)/g;
  const regexpPYProps = /(\w+)\.(.*?)/g;
  const regexpPYValues = /\b(None|undefined|True|False)\b/g;
  const regexpPYString = /(?<=[\s|(|\[|,|:])(".*?"|'.*?')/g;
  const regexpPYArray = /(?<=[=\s])([\[.*?][/\]])/g;
  const regexpPYClass = /(?<=class\s)(.*?)(?=\:)/g;
  const regexpPYClassInstance = /([A-Z]\w*(?=\())/g;
  const regexpPYComments = /(^\s*#.*$)/gm;
  const regexpPYConstructor = /\b(__init__)\b/g;
  const regexpCodePY: RegExp =
    /\[code python]((?:(?!\[\/code])[\s\S])*)\[\/code]/g;
  //Tables
  const regexpTable: RegExp = /\[table]((?:(?!\[\/table])[\s\S])*)\[\/table]/g;
  const regexpTableLine: RegExp = /\[r]((?:(?!\[\/r])[\s\S])*)\[\/r]/g;
  const regexpTableHeader: RegExp = /\[h]((?:(?!\[\/h])[\s\S])*)\[\/h]/g;
  const regexpTableCell: RegExp = /\[c]((?:(?!\[\/c])[\s\S])*)\[\/c]/g;
  const regexpAddress: RegExp =
    /\[addr]\(b=(.*?)\)\(c=(.*?)\)\(e=(.*?)\)((?:(?!\[\/addr])[\s\S])*)\[\/addr]/g;

  let textFormated = text.replace(regexpScript, " ");
  textFormated = text
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace(
      regexpLink,
      '<a class="underline" href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    )
    .replace(regexpBold, "<strong>$1</strong>")
    .replace(regexpItalic, "<em>$1</em>")
    .replace(regexpUnderline, '<span class="underline">$1</span>')
    .replace(regexpSuperior, "<sup>$1</sup>")
    .replace(regexpSub, "<sub>$1</sub>")
    .replace(regexpMark, "<mark>$1</mark>")
    .replace(regexpBig, "<big>$1</big>")
    .replace(regexpSmall, "<small>$1</small>")
    .replace(
      regexpUnorderedList,
      '<ul class="list-disc w-full my-2 py-2 px-6 border rounded-lg border-woodsmoke-200 dark:border-woodsmoke-800 whitespace-nowrap">$1</ul>'
    )
    .replace(
      regexpOrderedList,
      '<ol class="list-decimal w-full my-2 py-2 px-6 border rounded-lg border-woodsmoke-200 dark:border-woodsmoke-800 whitespace-nowrap">$1</ol>'
    )
    .replace(regexpListItem, "<li>$1</li>")
    .replace(
      regexpQuote,
      '<blockquote class="w-full my-2 p-1 pl-4 rounded-xs border-l-4 border-woodsmoke-950 bg-woodsmoke-900/25 dark:border-woodsmoke-400" cite="$1">$2</blockquote>'
    )
    .replace(regexpInlineQuote, "<q><em>$1</em></q>")
    .replace(regexpCodeJS, (match, code) => {
      code = code
        .replace(regexpJSComments, '<span style="color: #818998;">$1</span>')
        .replace(regexpJSClass, '<span style="color: #3AE4B1">$1</span>')
        .replace(regexpJSConstructor, '<span style="color: #54E43A">$1</span>')
        .replace(
          regexpJSClassInstance,
          '<span style="color: #3AE4B1">$1</span>'
        )
        .replace(regexpJSKeywords, '<span style="color: #BAA4D6;">$1</span>')
        .replace(regexpJSVariables, '<span style="color: #9F72D7;">$1</span>')
        .replace(regexpJSControlFlow, '<span style="color: #CD6C63;">$1</span>')
        .replace(regexpJSLoop, '<span style="color: #E5B54E;">$1</span>')
        .replace(regexpJSReturn, '<span style="color: #9F72D7;">$1</span>')
        .replace(regexpJSFunction, '<span style="color: #2F8EEF;">$1</span>')
        .replace(
          regexpJSMethod,
          '<span style="color: #2F8EEF;">$1<span style="color: #EEEEEE;">($2)</span></span>'
        )
        .replace(
          regexpJSProps,
          '<span class="text-[#DB594D]">$1<span class="text-[#EEEEEE]">.$2</span></span>'
        )
        .replace(regexpJSValues, '<span class="text-[#CC8A58]";">$1</span>')
        .replace(regexpJSString, '<span class="text-[#98C376]";>$1</span>')
        .replace(regexpJSArray, '<span class="text-[#E5B54E]">$1</span>');
      return `<div class="flex flex-col w-full bg-[#282C34] p-2 rounded-md text-[#EEEEEE]">
           <span class="text-woodsmoke-100">Javascript</span>
           <div class="border border-[#31363F]"></div>
           <code class="whitespace-pre overflow-x-auto scrollbar-thin scrollbar-thumb-[#3E4451] scrollbar-track-[#282C34]">${code}</code>
         </div>`;
    })
    .replace(regexpCodePY, (match, code) => {
      code = code
        .replace(regexpPYComments, '<span style="color: #818998;">$1</span>')
        .replace(regexpPYClass, '<span style="color: #3AE4B1">$1</span>')
        .replace(regexpPYConstructor, '<span style="color: #54E43A">$1</span>')
        .replace(
          regexpPYClassInstance,
          '<span style="color: #3AE4B1">$1</span>'
        )
        .replace(regexpPYKeywords, '<span style="color: #BAA4D6;">$1</span>')
        .replace(regexpPYVariables, '<span style="color: #9F72D7;">$1</span>')
        .replace(regexpPYConstant, '<span style="color: #D7AA72;">$1</span>')
        .replace(regexpPYControlFlow, '<span style="color: #CD6C63;">$1</span>')
        .replace(regexpPYLoop, '<span style="color: #E5B54E;">$1</span>')
        .replace(regexpPYReturn, '<span style="color: #9F72D7;">$1</span>')
        .replace(regexpPYFunction, '<span style="color: #2F8EEF;">$1</span>')
        .replace(
          regexpPYMethod,
          '<span style="color: #2F8EEF;">$1<span style="color: #EEEEEE;">($2)</span></span>'
        )
        .replace(
          regexpPYProps,
          '<span class="text-[#DB594D]">$1<span class="text-[#EEEEEE]">.$2</span></span>'
        )
        .replace(regexpPYValues, '<span class="text-[#CC8A58]";">$1</span>')
        .replace(regexpPYString, '<span class="text-[#98C376]";>$1</span>')
        .replace(regexpPYArray, '<span class="text-[#E5B54E]">$1</span>');
      return `<div class="flex flex-col w-full bg-[#282C34] p-2 rounded-md text-[#EEEEEE]">
           <span class="text-woodsmoke-100">Python</span>
           <div class="border border-[#31363F]"></div>
           <code class="whitespace-pre overflow-x-auto scrollbar-thin scrollbar-thumb-[#3E4451] scrollbar-track-[#282C34]">${code}</code>
         </div>`;
    })
    .replace(regexpColorRGB, '<span style="color:rgb($1,$2,$3);">$4</span>')
    .replace(regexpColorHSL, '<span style="color:hsl($1,$2%,$3%);">$4</span>')
    .replace(regexpColorHEX, '<span style="color:#$1;">$2</span>')
    .replace(
      regexpTable,
      '<table class="w-full my-2 rounded-md border border-woodsmoke-200 border-separate border-spacing-1 overflow-clip dark:border-woodsmoke-800">$1</table>'
    )
    .replace(
      regexpTableHeader,
      '<th class="gap-2 bg-woodsmoke-700 text-woodsmoke-100">$1</th>'
    )
    .replace(
      regexpTableLine,
      '<tr class="odd:bg-woodsmoke-300 odd:text-woodsmoke-950">$1</tr>'
    )
    .replace(regexpTableCell, '<td class="">$1</td>')
    .replace(regexpAddress, (match, b, c, e) => {
      const addrNames = [b, c, e].map((addr) => {
        return addr === "0" || addr === undefined ? "" : addr;
      });

      const formattedAddres = addrNames
        .map((name) => name!.replace(/\+/g, " "))
        .join("+");

      return `<address class="inline-flex text-woodsmoke-950 dark:text-woodsmoke-50"><a class="inline underline" href="https://www.google.com.br/maps/place/${formattedAddres}" target="_blank" rel="noopener noreferrer">${addrNames.filter((value) => value !== "").join(", ")}</a>
      </address>`;
    });
  textFormated.replace(regexpNewLine, "<br>");
  return textFormated;
};

export default formaterText;
