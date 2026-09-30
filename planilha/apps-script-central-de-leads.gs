/**
 * CENTRAL DE LEADS - Willian Moitinho
 * Recebe os leads enviados pelo popup do site e grava na aba "CENTRAL DE LEADS".
 *
 * COMO USAR:
 * 1. Abra a planilha no Google Sheets.
 * 2. Menu: Extensões > Apps Script.
 * 3. Apague o conteúdo e cole TODO este código. Salve.
 * 4. Botão "Implantar" (Deploy) > "Nova implantação" > tipo "App da Web".
 *    - Executar como: Eu (sua conta)
 *    - Quem pode acessar: Qualquer pessoa
 * 5. Copie a URL do App da Web (termina em /exec).
 * 6. Cole essa URL na variável SHEET_ENDPOINT do arquivo nutri-landing-page.html.
 */

var ABA = 'CENTRAL DE LEADS';
var PRIMEIRA_LINHA = 5; // os dados começam na linha 5

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA);
    var d = JSON.parse(e.postData.contents);

    // acha a primeira linha vazia olhando a coluna C (NOME COMPLETO)
    var linha = PRIMEIRA_LINHA;
    var nomes = sh.getRange('C' + PRIMEIRA_LINHA + ':C' + sh.getMaxRows()).getValues();
    for (var i = 0; i < nomes.length; i++) {
      if (nomes[i][0] === '' || nomes[i][0] === null) { linha = PRIMEIRA_LINHA + i; break; }
      linha = PRIMEIRA_LINHA + i + 1;
    }

    var num = linha - (PRIMEIRA_LINHA - 1); // # sequencial

    // A..P (16 colunas)
    sh.getRange(linha, 1, 1, 16).setValues([[
      num,
      new Date(),          // B DATA DE ENTRADA
      d.nome || '',        // C NOME
      d.whatsapp || '',    // D TELEFONE
      d.objetivo || '',    // E OBJETIVO
      'NÃO',               // F RESPONDEU
      'NÃO',               // G PUV
      'NÃO',               // H AGENDOU
      'NÃO',               // I COMPROU
      '',                  // J TIPO
      '',                  // K VALOR
      d.origem || 'DIRETO',// L ORIGEM
      d.utm_source || '',  // M
      d.utm_medium || '',  // N
      d.utm_campaign || '',// O
      d.utm_content || ''  // P
    ]]);

    // Q STATUS GERAL (fórmula)
    sh.getRange(linha, 17).setFormula(
      '=IF(C' + linha + '="","",IF(I' + linha + '="SIM","Cliente 💰",IF(H' + linha +
      '="SIM","Agendado 📅",IF(G' + linha + '="SIM","Recebeu PUV",IF(F' + linha +
      '="SIM","Em conversa","Novo Lead")))))'
    );

    return ContentService.createTextOutput(JSON.stringify({ok: true, linha: linha}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, erro: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// permite um teste rápido abrindo a URL no navegador
function doGet() {
  return ContentService.createTextOutput('Central de Leads ativo. Use POST para gravar.');
}
