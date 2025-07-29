'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

export default function AICorpSite() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Привет! 👋 Я ИИ-ассистент. Как дела?' }
  ])
  const [userInput, setUserInput] = useState('')
  const [userBehavior, setUserBehavior] = useState({
    pageViews: 0,
    timeOnPage: 0,
    interactionScore: 0
  })
  const [animatedText, setAnimatedText] = useState('')
  
  const aiGreeting = "Добро пожаловать в будущее корпоративных ИИ-решений"
  
  useEffect(() => {
    // Анимация печатающегося текста
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex < aiGreeting.length) {
        setAnimatedText(aiGreeting.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, 80)
    
    // Аналитика поведения пользователя
    const startTime = Date.now()
    setUserBehavior(prev => ({ ...prev, pageViews: prev.pageViews + 1 }))
    
    const trackTime = setInterval(() => {
      setUserBehavior(prev => ({
        ...prev,
        timeOnPage: Math.floor((Date.now() - startTime) / 1000)
      }))
    }, 1000)
    
    return () => {
      clearInterval(timer)
      clearInterval(trackTime)
    }
  }, [])
  
  const handleChatSend = () => {
    if (!userInput.trim()) return
    
    setMessages(prev => [...prev, { type: 'user', text: userInput }])
    setUserBehavior(prev => ({ ...prev, interactionScore: prev.interactionScore + 10 }))
    
    // Симуляция ответа ИИ
    setTimeout(() => {
      const responses = [
        'Отличный вопрос! Наши ИИ-решения помогут оптимизировать ваши процессы.',
        'Я проанализировал ваш запрос. Рекомендую посмотреть раздел "Технологии".',
        'На основе вашего поведения на сайте, вас может заинтересовать наш Demo.',
        'Персонализированный контент: вы провели уже ' + userBehavior.timeOnPage + ' секунд на сайте!'
      ]
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: responses[Math.floor(Math.random() * responses.length)]
      }])
    }, 1000)
    
    setUserInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-950/20 to-background text-foreground font-medium">
      {/* Навигация */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-primary/20 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon name="Cpu" className="text-primary animate-pulse-glow" size={32} />
            <span className="text-2xl font-bold">AI CORPORATE</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">Главная</a>
            <a href="#tech" className="hover:text-primary transition-colors">Технологии</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Решения</a>
            <a href="#team" className="hover:text-primary transition-colors">Команда</a>
            <a href="#demo" className="hover:text-primary transition-colors">Демо</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </nav>

      {/* Главная секция */}
      <section id="home" className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <Icon name="Brain" className="mx-auto mb-8 text-primary animate-float" size={80} />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              {animatedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Революционные ИИ-технологии для вашего бизнеса. 
              Аналитика поведения и персонализация нового уровня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="hover:scale-105 transition-transform animate-pulse-glow">
                <Icon name="Rocket" className="mr-2" size={20} />
                Начать сейчас
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть демо
              </Button>
            </div>
          </div>
        </div>
        
        {/* Аналитика поведения в реальном времени */}
        <div className="absolute top-32 right-8 animate-scale-in">
          <Card className="w-64 bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name="Activity" className="mr-2 text-primary" size={16} />
                Аналитика в реальном времени
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Просмотры:</span>
                <Badge variant="secondary">{userBehavior.pageViews}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Время на сайте:</span>
                  <span>{userBehavior.timeOnPage}s</span>
                </div>
                <Progress value={(userBehavior.timeOnPage / 60) * 100} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Взаимодействия:</span>
                <Badge className="bg-primary">{userBehavior.interactionScore}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Технологии */}
      <section id="tech" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Передовые технологии</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Используем последние достижения в области искусственного интеллекта
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Brain', title: 'Машинное обучение', desc: 'Глубокие нейронные сети для анализа данных' },
              { icon: 'Zap', title: 'Обработка в реальном времени', desc: 'Мгновенный анализ и принятие решений' },
              { icon: 'Shield', title: 'Безопасность данных', desc: 'Криптографическая защита и приватность' }
            ].map((tech, i) => (
              <Card key={i} className="hover:scale-105 transition-transform duration-300 animate-fade-in border-primary/20 bg-card/50 backdrop-blur-sm" style={{animationDelay: `${i * 0.2}s`}}>
                <CardHeader className="text-center">
                  <Icon name={tech.icon as any} className="mx-auto mb-4 text-primary animate-float" size={48} />
                  <CardTitle>{tech.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{tech.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Решения */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши решения</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Комплексные ИИ-системы для различных отраслей
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Персонализация контента', metrics: ['95% точность', '200% увеличение конверсии'] },
              { title: 'Аналитика поведения', metrics: ['Real-time данные', '10+ метрик отслеживания'] },
              { title: 'Автоматизация процессов', metrics: ['70% экономия времени', '99.9% надежность'] },
              { title: 'Прогнозная аналитика', metrics: ['90% точность прогнозов', 'До 12 месяцев вперед'] }
            ].map((solution, i) => (
              <Card key={i} className="p-6 hover:scale-105 transition-transform animate-fade-in border-primary/20 bg-gradient-to-br from-card to-primary/5" style={{animationDelay: `${i * 0.1}s`}}>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Icon name="CheckCircle" className="mr-2 text-primary" size={20} />
                  {solution.title}
                </h3>
                <div className="space-y-2">
                  {solution.metrics.map((metric, j) => (
                    <Badge key={j} variant="secondary" className="mr-2">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section id="team" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Экспертная команда</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Специалисты мирового уровня в области ИИ и машинного обучения
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Александр Петров', role: 'Chief AI Officer', exp: '15+ лет в ИИ' },
              { name: 'Мария Сидорова', role: 'Lead Data Scientist', exp: 'PhD в ML' },
              { name: 'Дмитрий Козлов', role: 'Head of Engineering', exp: '12+ проектов' }
            ].map((member, i) => (
              <Card key={i} className="text-center hover:scale-105 transition-transform animate-fade-in border-primary/20 bg-card/50 backdrop-blur-sm" style={{animationDelay: `${i * 0.2}s`}}>
                <CardHeader>
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center mb-4">
                    <Icon name="User" size={32} className="text-white" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{member.exp}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Демо */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Интерактивное демо</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Попробуйте наши ИИ-решения в действии
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 animate-scale-in border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Icon name="Cpu" className="mr-2 text-primary animate-pulse-glow" size={24} />
                    ИИ-аналитика
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Скорость обработки</span>
                        <span className="text-primary">1.2ms</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Точность модели</span>
                        <span className="text-primary">94.7%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Вовлеченность</span>
                        <span className="text-primary">78.3%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Icon name="Target" className="mr-2 text-primary" size={24} />
                    Персонализация
                  </h3>
                  <div className="space-y-3">
                    <Badge className="w-full justify-start p-3 bg-primary/10 text-primary border-primary/20">
                      <Icon name="User" className="mr-2" size={16} />
                      Профиль пользователя: Технический специалист
                    </Badge>
                    <Badge className="w-full justify-start p-3 bg-green-500/10 text-green-400 border-green-500/20">
                      <Icon name="TrendingUp" className="mr-2" size={16} />
                      Интересы: ИИ, автоматизация, аналитика
                    </Badge>
                    <Badge className="w-full justify-start p-3 bg-blue-500/10 text-blue-400 border-blue-500/20">
                      <Icon name="Clock" className="mr-2" size={16} />
                      Рекомендация: Раздел "Технологии"
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Готовы внедрить ИИ в ваш бизнес? Обсудим ваши задачи
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 animate-scale-in border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" className="text-primary" size={20} />
                    <span>contact@aicorp.ru</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" className="text-primary" size={20} />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" className="text-primary" size={20} />
                    <span>Москва, Технопарк</span>
                  </div>
                </div>
                <div>
                  <Button className="w-full mb-4 hover:scale-105 transition-transform animate-pulse-glow">
                    <Icon name="Calendar" className="mr-2" size={16} />
                    Записаться на консультацию
                  </Button>
                  <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                    <Icon name="Download" className="mr-2" size={16} />
                    Скачать презентацию
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ИИ-чатбот */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <Button
            size="lg"
            onClick={() => setChatOpen(true)}
            className="rounded-full w-16 h-16 animate-pulse-glow hover:scale-110 transition-transform shadow-2xl"
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
        ) : (
          <Card className="w-80 h-96 flex flex-col animate-scale-in border-primary/20 bg-card/95 backdrop-blur-lg">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <Icon name="Bot" className="text-primary animate-pulse" size={20} />
                <CardTitle className="text-sm">ИИ Ассистент</CardTitle>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setChatOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-lg ${
                  msg.type === 'bot' 
                    ? 'bg-primary/10 text-primary-foreground border-l-4 border-primary' 
                    : 'bg-secondary text-secondary-foreground ml-4'
                }`}>
                  {msg.text}
                </div>
              ))}
            </CardContent>
            
            <div className="p-4 border-t border-primary/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 px-3 py-2 bg-background border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button size="sm" onClick={handleChatSend} className="hover:scale-105 transition-transform">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}