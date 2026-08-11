import React from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Star, 
  ShieldCheck, 
  Flame, 
  Compass, 
  Gem, 
  Globe, 
  Clock, 
  Zap, 
  Calendar,
  Layers,
  Award,
  CheckCircle2,
  FileText
} from 'lucide-react';
import '../../styles/ui/IconBadge.css';

export function IconBadge({ icon, theme = 'emerald', size = 'md' }) {
  const getIcon = () => {
    switch (icon) {
      case 'taurus':
      case 'lagna':
        return <Compass className="badge-icon" />;
      case 'sagittarius':
      case 'moon':
        return <Moon className="badge-icon" />;
      case 'star':
      case 'nakshatra':
        return <Star className="badge-icon" />;
      case 'venus':
      case 'shukra':
        return <Sparkles className="badge-icon" />;
      case 'jupiter':
      case 'guru':
        return <Sun className="badge-icon" />;
      case 'rahu':
        return <Flame className="badge-icon" />;
      case 'gem':
      case 'emerald':
        return <Gem className="badge-icon" />;
      case 'globe':
        return <Globe className="badge-icon" />;
      case 'clock':
        return <Clock className="badge-icon" />;
      case 'shield':
        return <ShieldCheck className="badge-icon" />;
      case 'calendar':
        return <Calendar className="badge-icon" />;
      case 'layers':
        return <Layers className="badge-icon" />;
      case 'award':
        return <Award className="badge-icon" />;
      case 'pdf':
        return <FileText className="badge-icon" />;
      default:
        return <CheckCircle2 className="badge-icon" />;
    }
  };

  return (
    <div className={`icon-badge-wrap theme-${theme} size-${size}`}>
      {getIcon()}
    </div>
  );
}
