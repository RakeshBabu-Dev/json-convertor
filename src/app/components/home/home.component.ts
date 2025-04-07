import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { JsonConverterService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CodemirrorModule],
  templateUrl: './home.component.html',
  styles: [`
    body:{
      font-family:'arial';

    }


    .editor-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin: 20px;

    }

    .editor-wrapper {
      flex: 1 1 45%;
      min-width: 300px;
      color : white;
      font-family : 'arial'
    }

    .editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .editor-holder {
      position: relative;
    }

    .editor {
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .submit-button {
      padding: 10px 20px;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
      cursor: pointer;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
    }

    .editor-copy-button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .editor-holder:hover .editor-copy-button {
      opacity: 1;
    }

    .editor-copy-button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .copy-icon {
      width: 16px;
      height: 16px;
      fill: #555;
    }

    .copy-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      z-index: 1000;
      background-color: green;
      animation: fadeInOut 2.5s;
      font-family: 'arial' ;
    }

    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(10px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(10px); }
    }

    .error-message {
      color: #f44336;
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {
  editorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript'
  };

  readOnlyOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript',
    readOnly: 'nocursor'
  };

  code = `{
  "_id": {
    "$oid": "66ff99aa88bb77cc66dd55ee"
  },
  "name": "Bruce Wayne",
  "alias": "Batman",
  "age": 35,
  "active": true,
  "retirementDate": null,
  "lastLogin": {
    "$date": "2025-04-05T14:32:00Z"
  },
  "bio": "Vigilante. Billionaire. Detective.",
  "skills": [
    "martial arts",
    "stealth",
    "intellect",
    100,
    true,
    null
  ],
  "vehicles": {
    "batmobile": {
      "topSpeed": 200.5,
      "armored": true,
      "gadgets": [
        "oil slick",
        "grappling hook",
        "EMP",
        {
          "custom": "Smoke Screen"
        }
      ]
    },
    "batwing": {
      "flight": true,
      "weapons": {
        "missiles": 4,
        "machineGuns": true
      }
    }
  },
  "missions": [
    {
      "missionId": 1,
      "location": "Gotham",
      "success": true,
      "timeTakenHours": 4.5,
      "villains": ["Joker"],
      "timestamp": {
        "$date": "2025-03-20T21:00:00Z"
      }
    },
    {
      "missionId": 2,
      "location": "Arkham Asylum",
      "success": false,
      "timeTakenHours": 6,
      "villains": ["Riddler", "Two-Face"],
      "timestamp": {
        "$date": "2025-03-28T18:15:00Z"
      }
    }
  ],
  "suitVersions": [
    {
      "version": "1.0",
      "material": "kevlar",
      "dateDeployed": {
        "$date": "2023-11-10T08:00:00Z"
      }
    },
    {
      "version": "2.1",
      "material": "titanium",
      "dateDeployed": {
        "$date": "2024-07-01T09:30:00Z"
      }
    }
  ]

}`;
  convertedCode = '';
  error = '';
  showCopyNotification = false;

  constructor(private converterService: JsonConverterService) {}

  ngOnInit(): void {}

  convertCode(): void {
    this.converterService.convertData(this.code).subscribe({
      next: (response) => {
        this.convertedCode = JSON.stringify(response.data, null, 2);
        this.error = '';
      },
      error: (err) => {
        this.convertedCode = '';
        this.error = err.error?.message || 'Unknown error occurred';
      }
    });
  }

  async copyContent(content: string, isOutput: boolean = false): Promise<void> {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      this.showCopyNotification = true;
      setTimeout(() => this.showCopyNotification = false, 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for browsers that don't support Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showCopyNotification = true;
      setTimeout(() => this.showCopyNotification = false, 2500);
    }
  }
}
