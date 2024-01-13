import { Injectable, inject } from '@angular/core';
import { AssistantService } from '../assistant/assistant.service';
import { ToastService } from '../toast/toast.service';
import { LocalStoreService } from '../localStore/local-store.service';
import { ModalController } from '@ionic/angular/standalone';
import { AddConversationsComponent } from 'src/app/domain/components/add-conversations/add-conversations.component';
import { ChatComponent } from 'src/app/domain/components/chat/chat.component';
import { Conversation } from 'src/app/domain/models/conversations.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  modalController = inject(ModalController);
  assistantService = inject(AssistantService);
  toastService = inject(ToastService);
  localStoreService = inject(LocalStoreService);

  constructor() { }

  setCurrentConversation(idConversation: number) {
    this.assistantService.setCurrentConversation(idConversation);
  }

  async showChat() {
    const modal = await this.modalController.create({
      component: ChatComponent,
    });

    await modal.present();
  }

  async showAddConversationModal(): Promise<string | null> {
    const modal = await this.modalController.create({
      component: AddConversationsComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    return data?.result || null;
  }

  async sendMessage(id: number, message: string, sender: string) {
    const getResult = await this.localStoreService.getFromLocalStore('conversations');
    const storedValue = getResult.value || '[]';
    const conversations: Conversation[] = JSON.parse(storedValue);

    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === id) {
        const updatedMessages = [...conversation.messages || [], { message, sender }];
        return {
          ...conversation,
          messages: updatedMessages
        };
      } else {
        return conversation;
      }
    });

    await this.localStoreService.setToLocalStore('conversations', JSON.stringify(updatedConversations));

    this.assistantService.sendMessage(id, message, sender);
  }

  async addConversation(category: string, icon: string) {
    this.toastService.success('AI Assistant conversation has been generated.');
    const newConversation = {
      id: this.generateId(),
      messages: [
        {
          message:
            "Hey, I'm an AI Assistant. I'm here to assist you with anything you need. Let's talk whenever you want!",
          sender: 'system',
        },
      ],
      category: category,
      icon: icon,
    };
    const getResult = await this.localStoreService.getFromLocalStore(
      'conversations'
    );
    const storedValue = getResult.value || '[]';
    const conversations: any[] = JSON.parse(storedValue);

    conversations.unshift(newConversation);

    await this.localStoreService.setToLocalStore(
      'conversations',
      JSON.stringify(conversations)
    );

    this.assistantService.addConversation(newConversation);
  }

  async removeConversation(idConversation: number) {
    this.toastService.success('Conversation has been removed.');
    const getResult = await this.localStoreService.getFromLocalStore(
      'conversations'
    );
    const storedValue = getResult.value || '[]';
    const conversations: any[] = JSON.parse(storedValue);
    const newConversations = conversations.filter(
      (conv: any) => conv.id !== idConversation
    );
    await this.localStoreService.setToLocalStore(
      'conversations',
      JSON.stringify(newConversations)
    );

    this.assistantService.removeConversation(idConversation);
  }

  generateId(): number {
    const min = 10000;
    const max = 99999;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id;
  }

  getRequestByType(type: string, prompt: string) {
    if (type === 'conversation') {
      return {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an ai chat, you will have a chat conversation with a person, this is an app to chat with an ai that speaks english and spanish so, if the prompt is in english, you answer in english, if the word is in spanish, you will answer in spanish. the idea of this conversation is having a fluent conversation like if the person is talking with another person, this will help the person who is talking to you learn english or spanish and have a fluent and constant learning in a real conversation. please always try to answer with a not too much large answer but i want to you to get the conversations about the chat. if user asks, you are an AI developing by Everit Jhon Molero Lledó and you use GPT 3.5 to work. remember, you are an assistant to chat to someone so if the person is writting in english, and he send you a prompt with a invalid ortographic then you will tell him the error in the ortographic for example if user say: Helo who are yu, then you explain that is Hello who are you, and if the case of spanish if user say: ola que tal, it must be Hola qué tal, and then you will answer to the prompt. i want that the user using this assistant feel comfortable and learn the language that he is speaking.' },
          { role: 'user', content: prompt },
        ],
      };
    } else if (type === 'linguisticInsights') {
      return {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Escribe una palabra o frase en español o inglés, y recibirás su equivalente en el otro idioma junto con una descripción detallada. Por ejemplo, si escribes "apple", la respuesta será: "Manzana\nSignificado: Fruta comestible de forma redonda, con piel de color rojo, verde o amarillo, y un sabor que varía de dulce a ácido. Se utiliza comúnmente en postres, jugos y como snack saludable."\nSi escribes "manzana", recibirás la traducción y descripción en inglés. La respuesta siempre estará estructurada en tres partes: la traducción, el significado y una descripción detallada que contendrá un maximo de 300 caracteres. Asegúrate de que la palabra en la traducción sea continua, sin espacios ni puntos. La respuesta se dividirá con un "\n" entre cada parte para facilitar su procesamiento. Evita utilizar también la palabra "Descripción:" y "Significado:", no son necesarias. en el meaning y y description. SIEMPRE tener en cuenta que: tus respuestas son traducciones para aprender acerca de esa traducción, como por ejemplo: Si el caso esque la respuesta es Call of duty, necesito la traducción de este, no me interesa que sea una empresa de videojuegos, no me interesa si es un videojuego o una pelicula, si el caso es ese entonces en su descripcion y significado da algo que tenga sentido y que sea informativo acerca de esa traduccion.',
          },
          { role: 'user', content: prompt },
        ],
      };
    }
    return {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You will receive random English words to help you learn the language. Each message will contain only a single word. For example, if the words are "car" and "vehicle," your response should be a string array ["Car", "Vehicle"]. I will provide 6 word suggestions to assist you in learning English. For instance: ["1. Then", "2. Whatever", "3. Meaning", "4. Hardcore", "5. Sky"]. Please avoid repeating words, and I will include words ranging from the simplest to more complex ones, including nouns, synonyms, adjectives, and other types of words in the English language.',
        },
        { role: 'user', content: prompt },
      ],
    };
  }
}
