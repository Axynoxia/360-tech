/**
 * Google Apps Script for 360-Tech Form Submission
 * This script receives form data and writes it to a Google Sheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. In the first row, add these column headers:
 *    - Prénom | Nom | E-mail | Tel | WhatsApp | Durée | Paiement | Abonnement
 * 3. Open Extensions > Apps Script
 * 4. Delete the default code and paste this script
 * 5. Save the project
 * 6. Click "Deploy" > "New deployment"
 * 7. Choose type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (important for CORS)
 * 10. Click "Deploy"
 * 11. Copy the Web app URL and use it in your form
 */

function doPost(e) {
  try {
    // Parse the form data
    const data = e.parameter;
    
    // Get the active spreadsheet (or replace 'YOUR_SHEET_NAME' with your sheet name)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // OR use a specific sheet by name:
    // const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses');
    
    // Prepare the row data in the same order as your headers
    const rowData = [
      data.prenom || '',           // Prénom
      data.nom || '',              // Nom
      data.email || '',            // E-mail
      data.telephone || '',        // Tel
      data.whatsapp || '',         // WhatsApp
      data.duree || '',            // Durée
      data.paiement || '',         // Paiement
      data.abonnement || ''        // Abonnement
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response (important for CORS)
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Formulaire soumis avec succès' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Test function to verify the script works
 * Run this once to test the script
 */
function testDoPost() {
  const testData = {
    parameter: {
      prenom: 'Test',
      nom: 'User',
      email: 'test@example.com',
      telephone: '+216 12 345 678',
      whatsapp: '+216 12 345 678',
      offre: 'Premium – 1 mois',
      categorie: 'Netflix',
      prix: '55 DT',
      details: 'Feature 1, Feature 2',
      paiement: 'D17',
      duree: '1 mois',
      abonnement: 'Catégorie: Netflix | Offre: Premium – 1 mois | Prix: 55 DT | Détails: Feature 1, Feature 2'
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

