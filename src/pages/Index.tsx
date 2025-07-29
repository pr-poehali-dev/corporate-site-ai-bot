'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

export default function AICorpSite() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [userBehavior, setUserBehavior] = useState({
    pageViews: 0,
    timeOnPage: 0,
    interactionScore: 0,
    scrollProgress: 0
  })
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)
  const [aiWelcome, setAiWelcome] = useState(false)
  const [animatedText, setAnimatedText] = useState('')
  
  const mainTitle = "Революционные ИИ-решения для корпораций"
  const aiGreeting = "Добро пожаловать! Я ваш ИИ-помощник 🤖"
  
  useEffect(() => {
    // Анимационное приветствие при загрузке
    setTimeout(() => {
      setShowWelcomeDialog(true)
      setMessages([{ type: 'bot', text: 'Привет! 👋 Меня зовут ARIA - ваш персональный ИИ-ассистент. Добро пожаловать в будущее корпоративных технологий!', timestamp: Date.now() }])
    }, 1500)
    
    // Печатающийся текст
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex < mainTitle.length) {
        setAnimatedText(mainTitle.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    // Аналитика поведения
    const startTime = Date.now()
    setUserBehavior(prev => ({ ...prev, pageViews: prev.pageViews + 1 }))
    
    const trackTime = setInterval(() => {
      setUserBehavior(prev => ({
        ...prev,
        timeOnPage: Math.floor((Date.now() - startTime) / 1000)
      }))
    }, 1000)
    
    // Отслеживание скролла
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setUserBehavior(prev => ({ ...prev, scrollProgress: progress }))
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearInterval(timer)
      clearInterval(trackTime)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const handleChatSend = () => {
    if (!userInput.trim()) return
    
    const newUserMessage = { type: 'user', text: userInput, timestamp: Date.now() }
    setMessages(prev => [...prev, newUserMessage])
    setUserBehavior(prev => ({ ...prev, interactionScore: prev.interactionScore + 15 }))
    
    // Симуляция "печатания" ответа ИИ
    setTimeout(() => {
      const responses = [
        'Отличный вопрос! 🚀 Наша ИИ-платформа может увеличить эффективность вашего бизнеса на 300%. Хотите узнать как?',
        `Я проанализировал ваше поведение - вы провели ${Math.floor(userBehavior.timeOnPage)} секунд на сайте. Рекомендую посмотреть раздел "Технологии" 📊`,
        'На основе вашей активности, вас может заинтересовать наше интерактивное демо. Попробуем? 🎯',
        `Персонализированный ответ: вы прокрутили ${Math.round(userBehavior.scrollProgress)}% страницы. Вижу, что вас интересуют наши решения! 📈`,
        'Я использую нейросети последнего поколения для анализа ваших потребностей. Давайте обсудим, как ИИ может помочь именно вашей компании! 🧠'
      ]
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now()
      }])
    }, 1200)
    
    setUserInput('')
  }

  const handleAIGreeting = () => {
    setChatOpen(true)
    setAiWelcome(true)
    setShowWelcomeDialog(false)
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: 'Отлично! Теперь я могу помочь вам с любыми вопросами о наших ИИ-решениях. Что вас интересует больше всего? 🤔',
      timestamp: Date.now()
    }])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Фоновые анимированные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      {/* Навигация */}
      {/* Приветственный диалог ИИ */}
      {showWelcomeDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <Card className="max-w-md mx-4 bg-slate-900/90 border-blue-500/30 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                  <Icon name="Bot" size={36} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl animate-pulse"></div>
              </div>
              <CardTitle className="text-xl text-blue-400">ARIA - ИИ Ассистент</CardTitle>
              <p className="text-slate-300 text-sm mt-2">
                Персональный помощник для навигации по сайту
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-slate-200">
                Привет! Я помогу вам изучить наши ИИ-решения и отвечу на любые вопросы.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleAIGreeting} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Icon name="MessageCircle" className="mr-2" size={16} />
                  Начать чат
                </Button>
                <Button variant="outline" onClick={() => setShowWelcomeDialog(false)} className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Позже
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Навигация */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Brain" className="text-blue-400 animate-pulse" size={36} />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NEURAL CORP
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Главная', 'ИИ-Решения', 'Технологии', 'Команда', 'Демо', 'Контакты'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace('ии-', '').replace('-', '')}`} 
                 className="hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Главная секция */}
      {/* Главная секция */}
      <section className="pt-24 min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="relative mb-8">
              <Icon name="Cpu" className="mx-auto text-blue-400" size={100} />
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {animatedText}
              </span>
              <span className="animate-pulse text-blue-400">|</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Встречайте будущее бизнеса с нашими ИИ-технологиями. 
              Персонализация, аналитика и автоматизация нового уровня.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <Icon name="Rocket" className="mr-2" size={20} />
                Запустить ИИ
              </Button>
              <Button variant="outline" size="lg" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transform hover:scale-105 transition-all duration-300">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть демо
              </Button>
            </div>

            {/* Показатели в реальном времени */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'ИИ Обработка', value: '2.3ms', icon: 'Zap', color: 'blue' },
                { label: 'Точность', value: '99.7%', icon: 'Target', color: 'green' },
                { label: 'Активные пользователи', value: '50K+', icon: 'Users', color: 'purple' }
              ].map((stat, i) => (
                <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon name={stat.icon as any} className={`text-${stat.color}-400`} size={32} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Панель аналитики */}
        <div className="absolute top-32 right-8 hidden lg:block">
          <Card className="w-72 bg-slate-900/70 backdrop-blur-sm border-blue-500/30 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center text-blue-400">
                <Icon name="Activity" className="mr-2 animate-pulse" size={16} />
                ИИ Аналитика в реальном времени
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Активность:</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {userBehavior.interactionScore} баллов
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Время на сайте:</span>
                  <span className="text-blue-400">{userBehavior.timeOnPage}s</span>
                </div>
                <Progress value={(userBehavior.timeOnPage / 60) * 100} className="h-2 bg-slate-800" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Прогресс изучения:</span>
                  <span className="text-purple-400">{Math.round(userBehavior.scrollProgress)}%</span>
                </div>
                <Progress value={userBehavior.scrollProgress} className="h-2 bg-slate-800" />
              </div>
              
              <div className="pt-2 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400">ИИ анализирует ваше поведение</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Секция технологий */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Передовые ИИ-технологии
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Используем самые современные алгоритмы машинного обучения и нейронные сети
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: 'Brain', 
                title: 'Глубокое обучение', 
                desc: 'Нейронные сети с 1000+ слоями для сложного анализа данных',
                metrics: ['99.7% точность', '2.3ms обработка']
              },
              { 
                icon: 'Zap', 
                title: 'Real-time ИИ', 
                desc: 'Мгновенная обработка и принятие решений в реальном времени',
                metrics: ['<1ms задержка', '50K запросов/сек']
              },
              { 
                icon: 'Shield', 
                title: 'Безопасный ИИ', 
                desc: 'Защищенные алгоритмы с шифрованием и приватностью данных',
                metrics: ['256-bit шифрование', 'GDPR compliance']
              }
            ].map((tech, i) => (
              <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 transform hover:scale-105 transition-all duration-500 group" style={{animationDelay: `${i * 0.2}s`}}>
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Icon name={tech.icon as any} className="text-blue-400 group-hover:text-purple-400 transition-colors duration-300" size={56} />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                    {tech.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-slate-300">{tech.desc}</p>
                  <div className="space-y-2">
                    {tech.metrics?.map((metric, j) => (
                      <Badge key={j} variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                        {metric}
                      </Badge>
                    ))}
                  </div>
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
          <div className="relative">
            <Button
              size="lg"
              onClick={() => setChatOpen(true)}
              className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <Icon name="MessageCircle" size={28} />
            </Button>
            {!aiWelcome && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-xs font-bold">!</span>
              </div>
            )}
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl animate-pulse"></div>
          </div>
        ) : (
          <Card className="w-80 h-96 flex flex-col bg-slate-900/95 backdrop-blur-xl border-blue-500/30 shadow-2xl animate-slide-up">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Icon name="Bot" className="text-blue-400 animate-pulse" size={24} />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm"></div>
                </div>
                <div>
                  <CardTitle className="text-sm text-blue-400">ARIA</CardTitle>
                  <p className="text-xs text-slate-400">ИИ Ассистент</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Icon name="X" size={16} />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto space-y-3 text-sm p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-lg max-w-[90%] ${
                  msg.type === 'bot' 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400 text-slate-100 animate-slide-in-left' 
                    : 'bg-slate-800 text-slate-200 ml-auto animate-slide-in-right'
                }`}>
                  {msg.text}
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </CardContent>
            
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Спросите что-нибудь об ИИ..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
                <Button 
                  size="sm" 
                  onClick={handleChatSend}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              <div className="flex items-center justify-center mt-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                </div>
                <span className="text-xs text-slate-500 ml-2">ИИ готов к общению</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}